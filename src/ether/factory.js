import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x0a304fbf1C430E93eca77b7A30B2F49a773337B5'
);

export default instance;
