// config values stored by network name. see truffle-config.json for a mapping from network
// name to other params
const contractConfig = 
module.exports = {
  development: {
    dittoTokenAddress: '',
    merkleRoot: '',
    withdrawBlock: '',
    withdrawAddress: ''
  },
  test_local: {
    dittoTokenAddress: '',
    merkleRoot: '',
    withdrawBlock: '',
    withdrawAddress: ''
  },
  ditto_private: {
    dittoTokenAddress: '',
    merkleRoot: '',
    withdrawBlock: '',
    withdrawAddress: ''
  },
  eth_mainnet: {
    dittoTokenAddress: '',
    merkleRoot: '',
    withdrawBlock: '',
    withdrawAddress: ''
  },
  staging: {
    dittoTokenAddress: '',
    merkleRoot: '',
    withdrawBlock: '',
    withdrawAddress: ''
  },
  bsc_test: {
    bnbTokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    merkleRoot: '0x48d12ab215a830ee2b2588b7d0ff5ce42ddf581fd6d834c2b298f0e4cb812e97',
    withdrawBlock: '4272094',
    withdrawAddress: '0x614812d04526c0c882a6cb993a135fcd559f33f9'
  }
}
