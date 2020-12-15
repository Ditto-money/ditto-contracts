const Master = artifacts.require('Master');
const Ditto = artifacts.require('Ditto');
const SimpleOracle = artifacts.require('SimpleOracle');

const BigNumber = web3.BigNumber;
const BN = web3.utils.BN;

const valueStart = web3.utils.toBN("1e18")
const { expectRevert } = require('@openzeppelin/test-helpers');

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('Master', function (accounts) {

    const initialSupply  = new BN("1750000000000000");
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
            await master.setRebaseLocked(false);
            await master.rebase();

            const supplyAfterRebase = await ditto.totalSupply();

            assert(supplyAfterRebase.eq(initialSupply));
        });

        it('should adjust supply by 2% if Oracle price is $1.10', async () => {
            await master.setRebaseLocked(false);
            await oracle.setData(web3.utils.toBN("11e17"));
            await master.rebase();

            const supplyAfterRebase = await ditto.totalSupply();

            assert(supplyAfterRebase.eq(initialSupply));
        });

    });
})
