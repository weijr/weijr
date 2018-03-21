import web3 from './web3';
import Wager from './build/Wager.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Wager.interface), address)
};
