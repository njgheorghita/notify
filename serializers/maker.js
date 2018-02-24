module.exports = maker => {
  const serialized = {
	id: maker.cdpid,
	threshold: maker.threshold,
	activeThreshold: maker.activeThreshold,
	network: maker.network,
	phone: maker.phone,
	nonce: maker.nonce,
  }
  return serialized;
};
