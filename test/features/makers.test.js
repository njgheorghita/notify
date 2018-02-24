const expect = require('expect');
const jwt = require('jsonwebtoken');
const request = require('supertest');

require('../helpers/testSetup');
const app = require('../../app');

describe('Makers', () => {
  it('can get an index of makers', async () => {
	await request(app)
	  .post('/makers')
	  .send({
		cdpid: 123,
		threshold: 150,
		activeThreshold: true,
		network: "Rinkeby",
		phone: "8168727883",
		nonce: 10,
	  });
	await request(app)
	  .post('/makers')
	  .send({
		cdpid: 124,
		threshold: 150,
		activeThreshold: true,
		network: "Rinkeby",
		phone: "8168727883",
		nonce: 10,
	  });
	const res = await request(app)
	  .get('/makers')
	  .expect(200);

	expect(res.body.makers.length).toEqual(2);
	expect(res.body.makers[0].network).toEqual('Rinkeby');
  });
});
