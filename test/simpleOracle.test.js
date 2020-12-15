const { expectRevert } = require('@openzeppelin/test-helpers');
const SimpleOracle = artifacts.require('SimpleOracle');
const BigNumber = web3.BigNumber;
const valueStart = web3.utils.toBN("1e18");

contract('SimpleOracle', (accounts) => {

    beforeEach(async () => {
        this.simpleOracle = await SimpleOracle.new();
        await this.simpleOracle.setData(valueStart);
    });

    it('should have initial value set in the oracle contract', async () => {
        const value = await this.simpleOracle.getData();
        assert(value.eq(valueStart));
    })

    it('should revert on setData if caller is not the owner', async () => {
        await expectRevert(
            this.simpleOracle.setData(web3.utils.toBN("1337"), { from: accounts[1] }),
            'revert'
        );
    })
})
