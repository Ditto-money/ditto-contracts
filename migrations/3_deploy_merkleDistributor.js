const contractConfig = require('../contract-config.js')
const valueStart = web3.utils.toBN("1e18")
const DittoClaimDistributor = artifacts.require('MerkleDistributor');
const BigNumber = web3.BigNumber;

module.exports = function (deployer, network, accounts) {
    deployer.then(async () => {

        // Deploy MerkleDistribution Contract
        const config = contractConfig[network]
        let { bnbTokenAddress, merkleRoot, withdrawBlock, withdrawAddress } = config

        withdrawBlock = withdrawBlock || 120
        withdrawAddress = withdrawAddress || accounts[20]

        console.log("bnbTokenAddress", bnbTokenAddress)
        console.log("merkleRoot", merkleRoot)
        console.log("withdrawBlock", withdrawBlock)
        console.log("withdrawAddress", withdrawAddress)

        await deployer.deploy(DittoClaimDistributor, bnbTokenAddress, merkleRoot, withdrawBlock, withdrawAddress)
    })
};
