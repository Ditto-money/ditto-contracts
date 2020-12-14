const Master = artifacts.require('Master');
const Ditto = artifacts.require('Ditto');
const SimpleOracle = artifacts.require('SimpleOracle');

const BigNumber = web3.BigNumber;
const valueStart = web3.utils.toBN("1e18")
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

    describe('rebase', function () {
        it('should fail if locked and called by user who is not the owner', async () => {
            await expectRevert(
                master.rebase({ from: accounts[1] }),
                'Rebase not allowed -- Reason given: Rebase not allowed.',
            );
        });
    });

});
