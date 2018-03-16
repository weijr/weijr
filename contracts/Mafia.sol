pragma solidity ^0.4.17;

contract Mafia {

  struct Player {
    address gamePlayer;
    bool mafia;
  }

  Player[] public players;
  uint public villagerMembers;
  uint public mafiaMembers;

  address public manager;

  mapping(address => bool) public alreadyPlaying;


  function Mafia() public {
      manager = msg.sender;
  }

  function addPlayer(address currentPlayer, bool mafia) public payable {
      require(!alreadyPlaying[currentPlayer]);
      players.push(Player({gamePlayer: currentPlayer, mafia: mafia}));
  }

  function recordPlayerIsPlaying(address playerThatsPlaying) public {
    alreadyPlaying[playerThatsPlaying] = true;
  }

  function incrementSides(bool isMafia) public {
    if (isMafia) {
        mafiaMembers++;
    }else {
        villagerMembers++;
      }
  }

  function payout(bool isWinningTeamMafia) public {
      //require(msg.sender == manager);
      uint numberOfWinners;
      if (isWinningTeamMafia) {
          numberOfWinners = mafiaMembers;
      } else {
          numberOfWinners = villagerMembers;
      }
      for (uint i = 0; i < players.length; i++) {
          if (players[i].mafia == isWinningTeamMafia) {
              players[i].gamePlayer.transfer(this.balance/numberOfWinners);
          }
      }
      //players = new Player[](0);
  }

  function getPlayersLength() public view returns(uint) {
    return players.length;
  }
}
