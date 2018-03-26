import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x4b790Ec98F0a9c5C642A2c591d559e057E436489'
);

export default instance;
