import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0xDc3903ADc648Fe951653a6244cBd629bbe991355'
);

export default instance;
