const Maker = require('../models/maker');
const makerSerializer = require('../serializers/maker');
const Web3 = require('../lib/web3');
const infuraAuth = process.env.INFURA_ACCESS_TOKEN;

exports.index = async (req, res, next) => {
  const makers = await Maker.all();
  const serializedMakers = makers.map(maker => makerSerializer(maker));
  res.json({ makers: await Promise.all(serializedMakers)
  });
};

exports.create = async (req, res, next) => {
  const maker = await Maker.create(req.body);
  const serializedMaker = makerSerializer(maker)
  if(maker.errors) {
	res.json({ maker });
  } else {
	res.json({ maker: serializedMaker });
  }
};

// calls exports
exports.poll = async (cdpid, network) => {
  const w32 = await Web3(network);
  const networkType = await w32.eth.net.getNetworkType();
  if (networkType == "rinkeby") {
	return cdpid;
  } else {
	return "dummy";
  }
};
