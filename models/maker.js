const query = require('../db/index').query;

const makerSerializer = require('../serializers/maker');

exports.all = async () => {
  const makers = (await query('SELECT * FROM "makers"')).rows;
  return makers;
};

exports.find = async id => {
  const maker = (await query('SELECT * FROM "makers" WHERE "id" = $1 LIMIT 1', [
	id,
  ])).rows[0];
  return maker;
};

exports.findBy = async property => {
  const key = Object.keys(property)[0];
  let findByQuery;
  switch (key) {
	case 'cdpid':
	  findByQuery = 'SELECT * FROM "makers" WHERE "cdpid" = $1 LIMIT 1';
	  break;
	case 'threshold':
	  findByQuery = 'SELECT * FROM "makers" WHERE "threshold" = $1 LIMIT 1';
	  break;
	case 'activeThreshold':
	  findByQuery = 'SELECT * FROM "makers" WHERE "activeThreshold" = $1 LIMIT 1';
	  break;
	case 'network':
	  findByQuery = 'SELECT * FROM "makers" WHERE "network" = $1 LIMIT 1';
	  break;
	case 'phone':
	  findByQuery = 'SELECT * FROM "makers" WHERE "phone" = $1 LIMIT 1';
	  break;
	case 'nonce':
	  findByQuery = 'SELECT * FROM "makers" WHERE "nonce" = $1 LIMIT 1';
	  break;
  }
  const value = property[key];
  const maker = (await query(findByQuery, [value])).rows[0];
  return maker;
};

exports.update = async newProperties => {
  const oldProps = await this.find(newProperties.id);
  const properties = { ...oldProps, ...newProperties };

  const updatedMaker = (await query(
	`UPDATE "makers" SET
	"cdpid"=$1,
	"threshold"=$2,
	"activeThreshold"=$3,
	"network"=$4,
	"phone"=$5,
	"nonce"=$6 WHERE id=$7 RETURNING *`,
	[
	  properties.cdpid,
	  properties.threshold,
	  properties.activeThreshold,
	  properties.network,
	  properties.phone,
	  properties.nonce,
	  properties.id,
	]
  )).rows[0];

  return updatedMaker;
};

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
	return {errors};
  }

  const createdMaker = (await query(
	`INSERT INTO "makers"(
	  "cdpid",
	  "threshold",
	  "activeThreshold",
	  "network",
	  "phone",
	  "nonce"
	) values ($1, $2, $3, $4, $5, $6) returning *`,
	[
	  properties.cdpid,
	  properties.threshold,
	  properties.activeThreshold,
	  properties.network,
	  properties.phone,
	  properties.nonce,
	]
  )).rows[0];
  return createdMaker;
};

async function validate(properties) {
  const errors = [];

  const existingCdpid = await exports.findBy({ cdpid: properties.cdpid });
  if(existingCdpid) {
	const error = 'Alert for this CDPID already made';
	errors.push(error);
  }

  if (errors.length > 0) {
	return errors;
  }
};
