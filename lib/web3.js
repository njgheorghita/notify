const Web3 = require('web3');
const infuraAuth = process.env.INFURA_ACCESS_TOKEN;

module.exports = async network => {
  const url = 'https://' + network + '.infura.io/' + infuraAuth
  return new Web3(url)
}
