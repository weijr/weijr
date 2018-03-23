import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x05994c095ECEeB9eAc918cd94908e254BDF89798'
);

export default instance;
