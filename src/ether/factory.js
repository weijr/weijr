import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x43e42152d2d5Ac29fa8DF991555e29Ee4941Ac7d'
);

export default instance;
