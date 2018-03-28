import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x974E2326a24497DE97fF591f88f4f9D68F7eCC74'
);

export default instance;
