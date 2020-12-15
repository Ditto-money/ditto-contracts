const Master = artifacts.require('Master');
const Ditto = artifacts.require('Ditto');
const SimpleOracle = artifacts.require('SimpleOracle');

const BigNumber = web3.BigNumber;
const BN = web3.utils.BN;

const valueStart = web3.utils.toBN("1000000000000000000")
const { expectRevert } = require('@openzeppelin/test-helpers');

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('Master', function (accounts) {

    let ditto, master, oracle;

    beforeEach(async () => {
        oracle = await SimpleOracle.new();
        await oracle.setData(valueStart);

        ditto = await Ditto.new();
        master = await Master.new(ditto.address);

        await master.setMarketOracle(oracle.address);
        await ditto.setMaster(master.address);

    });

    describe('Rebase logic', function () {
        it('should fail if locked and called by user who is not the owner', async () => {
            await expectRevert(
                master.rebase({ from: accounts[1] }),
                'Rebase not allowed -- Reason given: Rebase not allowed.',
            );
        });

        it('should not change supply if Oracle price is $1', async () => {

            const supplyBeforeRebase = await ditto.totalSupply();
            const rebaseValues = await master.getRebaseValues();
     
            await master.rebase();

            const supplyAfterRebase = await ditto.totalSupply();

            assert(supplyAfterRebase.eq(supplyBeforeRebase));
        });

        it('should adjust supply by +2% if Oracle price is $1.10', async () => {

            const supplyBeforeRebase = await ditto.totalSupply();
            const rebaseValues = await master.getRebaseValues();

            await oracle.setData(web3.utils.toBN("1100000000000000000"));
            await master.rebase();

            const supplyAfterRebase = await ditto.totalSupply();

            assert(supplyAfterRebase.eq(supplyBeforeRebase.mul(new BN('102')).div(new BN('100'))));
        });

        it('should adjust supply by -5% if Oracle price is $0.90', async () => {

            const supplyBeforeRebase = await ditto.totalSupply();
            const rebaseValues = await master.getRebaseValues();

            await oracle.setData(web3.utils.toBN("900000000000000000"));
            await master.rebase();

            const supplyAfterRebase = await ditto.totalSupply();

            assert(supplyAfterRebase.eq(supplyBeforeRebase.mul(new BN('95')).div(new BN('100'))));
        });

    });
})
