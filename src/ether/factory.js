import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0xf908966CCe6f581FDaE976F04ebd98F3aAB1D465'
);

export default instance;
