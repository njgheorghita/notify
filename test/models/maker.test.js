const expect = require('expect');

require('../helpers/testSetup');

const Maker = require('../../models/maker.js');

describe('Maker', () => {
  it('can be created', async () => {
	const makersBefore = await Maker.all();
	expect(makersBefore.length).toBe(0);

	await Maker.create({
	  cdpid: 123,
	  threshold: 150,
	  activeThreshold: true,
	  network: "Rinkeby",
	  phone: "8168727883",
	  nonce: 10,
	});
	const makersAfter = await Maker.all();
	expect(makersAfter.length).toBe(1);
  });

  it('must have unique cdpid to be created', async () => {
	await Maker.create({
	  cdpid: 121,
	  threshold: 150,
	  activeThreshold: true,
	  network: "Rinkeby",
	  phone: "8168727883",
	  nonce: 10,
	});
	const duplicateMaker = await Maker.create({
	  cdpid: 121,
	  threshold: 150,
	  activeThreshold: true,
	  network: "Rinkeby",
	  phone: "8168727883",
	  nonce: 10,
	});

	expect(duplicateMaker).toEqual({ errors: ['Alert for this CDPID already made']});
	const makers = await Maker.all();
	expect(makers.length).toBe(1);
  });

  it('can be updated', async () => {
	const originalMaker = await Maker.create({
	  cdpid: 121,
	  threshold: 150,
	  activeThreshold: true,
	  network: "Rinkeby",
	  phone: "8168727883",
	  nonce: 10,
	});
	await Maker.update({
	  id: originalMaker.id,
	  cdpid: 121,
	  threshold: 140,
	  activeThreshold: true,
	  network: "Rinkeby",
	  phone: "8168727883",
	  nonce: 100,
	});
    const updatedMaker = await Maker.findBy({cdpid: 121});
	expect(updatedMaker.nonce).toBe(100);
	expect(updatedMaker.threshold).toBe(140);
  });
});
