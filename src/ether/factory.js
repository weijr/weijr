import web3 from './web3';
import WagerFactory from './build/WagerFactory';

const instance = new web3.eth.Contract(
  JSON.parse(WagerFactory.interface),
  '0x9c995AcBb5A1EE5e1165fFB32fBC38d42A42670d'
);

export default instance;
