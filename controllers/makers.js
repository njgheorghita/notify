const Maker = require('../models/maker');
const makerSerializer = require('../serializers/maker');

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
	console.log("xxx")
	console.log(serializedMaker)
	res.json({ maker: serializedMaker });
  }
};
