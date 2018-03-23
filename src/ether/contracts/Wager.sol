pragma solidity ^0.4.18;

contract WagerFactory {
    address[] public deployedWagers;

    function createWager(uint minimum, string title) public {
        address newWager = new Wager(minimum, msg.sender, title);
        deployedWagers.push(newWager);
    }

    function getDeployedwagers() public view returns (address[]) {
        return deployedWagers;
    }
}

contract Wager {

  struct User {
    address accountNumber;
    bool side;
  }

  User[] public users;
  address public manager;

  uint public side1;
  uint public side2;
  uint public minimumBet;
  string public title;

  mapping(address => bool) public alreadyBetting;


  function Wager(uint minimum, address creator, string name) public {
      manager = creator;
      minimumBet = minimum;
      title = name;
  }

  function joinBet(bool side) public payable {
      require(msg.value >= minimumBet);
      require(msg.sender != manager);
      require(!alreadyBetting[msg.sender]);
      users.push(User({accountNumber: msg.sender, side: side}));
      alreadyBetting[msg.sender] = true;
      if (side) {
        side1++;
    }else {
        side2++;
      }
  }

  function payout(bool winningSide) public {
      require(msg.sender == manager);
      uint numberOfWinners;
      uint total = this.balance;
      if (winningSide) {
          numberOfWinners = side1;
      } else {
          numberOfWinners = side2;
      }
      for (uint i = 0; i < users.length; i++) {
          if (users[i].side == winningSide) {
              users[i].accountNumber.transfer(total/numberOfWinners);
          }
      }
  }

 function checkIfAlreadyInBet(address possiblePlayer)  public returns(bool) {
      return alreadyBetting[possiblePlayer];
  }

  function getUsersLength() public view returns(uint) {
    return users.length;
  }

  function getWagerSummary() public view returns (uint, uint, uint, uint, uint, address, string) {
      return (
          minimumBet,
          this.balance,
          users.length,
          side1,
          side2,
          manager,
          title
      );
  }
}
