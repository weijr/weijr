const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');
let mafiaContract;
let players;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  mafiaContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode})
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Mafia Contract', () => {

  it('deploys a contract', () => {
    assert.ok(mafiaContract.options.address)
  });

  it('allows 1 player to enter', async () => {

    await mafiaContract.methods.addPlayer(accounts[1], true).send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })
    const playersLength = await mafiaContract.methods.getPlayersLength().call()
    assert.equal(1, playersLength);
  })

  it('allows multiple player to enter', async () => {

    await mafiaContract.methods.addPlayer(accounts[1], true).send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })
    await mafiaContract.methods.addPlayer(accounts[2], false).send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    })
    await mafiaContract.methods.addPlayer(accounts[3], false).send({
      from: accounts[3],
      value: web3.utils.toWei('0.02', 'ether')
    })
    const playersLength = await mafiaContract.methods.getPlayersLength().call()
    assert.equal(3, playersLength);
  })

  xit('sends money to winning team and resets the players array', async () => {
    await mafiaContract.methods.addPlayer(accounts[1], true).send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    })
    await mafiaContract.methods.addPlayer(accounts[2], false).send({
      from: accounts[2],
      value: web3.utils.toWei('2', 'ether')
    })
    await mafiaContract.methods.addPlayer(accounts[3], false).send({
      from: accounts[3],
      value: web3.utils.toWei('2', 'ether')
    })

    await mafiaContract.methods.incrementSides(true).call();
    await mafiaContract.methods.incrementSides(false).call();
    await mafiaContract.methods.incrementSides(false).call();

    const initialBalance = await web3.eth.getBalance(accounts[1]);
     await mafiaContract.methods.payout(true).send( { from: accounts[0] })
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    const difference = finalBalance - initialBalance;

    console.log(initialBalance);
    console.log(finalBalance);
    console.log(difference);
    assert(difference > web3.utils.toWei('5', 'ether'));

  })
})
