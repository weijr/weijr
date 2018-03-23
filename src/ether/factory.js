import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x752a4472825792bEdA2a307d60f79c2696B1e711'
);

export default instance;
