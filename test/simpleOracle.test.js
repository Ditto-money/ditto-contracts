const { expectRevert } = require('@openzeppelin/test-helpers');
const { assert } = require('console');
const SimpleOracle = artifacts.require('SimpleOracle');
const BigNumber = web3.BigNumber;
const valueStart = web3.utils.toBN("1e18")

contract('SimpleOracle', ([alice]) => {
    beforeEach(async () => {
        this.simpleOracle = await SimpleOracle.new({ from: alice });
    });

    it('should have a value set in the oracle contract', async () => {
        const value = await this.simpleOracle.getData();
        assert.equal(value.valueOF(), valueStart)
    })
})
