const { expectRevert } = require('@openzeppelin/test-helpers');
const Ditto = artifacts.require('Ditto');

contract('Ditto', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.ditto = await Ditto.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.ditto.name();
        const symbol = await this.ditto.symbol();
        const decimals = await this.ditto.decimals();
        assert.equal(name.valueOf(), 'Ditto');
        assert.equal(symbol.valueOf(), 'DITTO');
        assert.equal(decimals.valueOf(), '9');
    });

    it('should only allow owner to mint token', async () => {
        await this.ditto.mint(alice, '100', { from: alice });
        await this.ditto.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.ditto.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.ditto.totalSupply();
        const aliceBal = await this.ditto.balanceOf(alice);
        const bobBal = await this.ditto.balanceOf(bob);
        const carolBal = await this.ditto.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.ditto.mint(alice, '100', { from: alice });
        await this.ditto.mint(bob, '1000', { from: alice });
        await this.ditto.transfer(carol, '10', { from: alice });
        await this.ditto.transfer(carol, '100', { from: bob });
        const totalSupply = await this.ditto.totalSupply();
        const aliceBal = await this.ditto.balanceOf(alice);
        const bobBal = await this.ditto.balanceOf(bob);
        const carolBal = await this.ditto.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.ditto.mint(alice, '100', { from: alice });
        await expectRevert(
            this.ditto.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.ditto.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
