const Master = artifacts.require('Master');
const Ditto = artifacts.require('Ditto');
const SimpleOracle = artifacts.require('SimpleOracle');

const BigNumber = web3.BigNumber;
const BlockchainCaller = _require('/util/blockchain_caller');
const chain = new BlockchainCaller(web3);
const { expectRevert } = require('@openzeppelin/test-helpers');

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .should();

let master, ditto, simpleOracle;

async function setupContracts() {
    await chain.waitForSomeTime(86400);
    const accounts = await chain.getUserAccounts();
    deployer = accounts[0];
    user = accounts[1];
    ditto = await Ditto.new();
    master = await Master.new(ditto.address);
    simpleOracle = await SimpleOracle.new();
}

contract('Master', function (accounts) {
    before('setup Master contract', setupContracts);

    describe('when rebase called by a contract', function () {
        it('should fail', async function () {
            const rebaseCallerContract = await Master.rebase();
            expect(
                await chain.isEthException(rebaseCallerContract.rebase(master.address))
            ).to.be.true;
        });
    });

    describe('when set Market Oracle', function () {
        it('should fail', async function () {
            const setMarketOracle = await Master.setMarketOracle(ditto.address);
            expect(
                await chain.isEthException(setMarketOracle.setMarketOracle(ditto.address))
            ).to.be.true;
        });
    });
});
