const Web3 = require("web3");
const HDWalletProvider = ("truffle");
const web3 = new Web3();

// Live Network Infura mainnet URL
const liveNetwork = process.env.ETH_LIVE_NETWORK;
const liveNetworkId = process.env.ETH_LIVE_NETWORK_ID;

// Ropsten
const ropstenNetwork = process.env.ETH_ROPSTEN_NETWORK;
const ropstenNetworkId = process.env.ETH_ROPSTEN_NETWORK_ID;

// seed or memmonic
const mnemonic = process.env.DEPLOY_WALLET_MNEMONIC;

// BSC TEST
const bscNetwork = process.env.BSC_RPC_MAINNET;
const bscNetworkId = process.env.BSC_RPC_MAINNET_ID;

//bscscan API
const bscscanAPI = process.env.BSCSCAN_API_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    bsc_test: {
      provider: () => new HDWalletProvider(mnemonic, bscNetwork),
      network_id: 56,
      gasPrice: web3.utils.toWei('20', 'gwei')
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, ropstenNetwork),
      network_id: 3,
      gas: 4000000
    },
    live: {
      provider: () => new HDWalletProvider(mnemonic, liveNetwork),
      network_id: liveNetworkId,
      gasPrice: web3.utils.toWei('10', 'gwei')
    }
  },
  compilers: {
    solc: {
      version: "^0.6.12",
    }
  },
  api_keys: {
    bscscan: bscscanAPI,
  },
  plugins: [
    'truffle-plugin-verify',
    'solidity-coverage'
  ],
}
