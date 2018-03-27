import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x3f5859259DFAf900197660690FFe4D0B7c8fA192'
);

export default instance;
