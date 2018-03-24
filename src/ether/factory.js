import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x23C2e14fD5A48Bec0afe378BDF6BDf098E05ABC3'
);

export default instance;
