import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0xA8FeaA62135CFa047f9bE0827ADbe7F24e966268'
);

export default instance;
