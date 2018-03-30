import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x2B87b2A5a3E50ce37A365D41FA8196a06A9F4e36'
);

export default instance;
