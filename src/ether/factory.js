import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0xD4EBA19fc7605055b0Af7944F561eB7f0d2E7EC9'
);

export default instance;
