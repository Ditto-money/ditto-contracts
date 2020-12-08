# Ditto Money

Smart contracts for the Ditto elastic supply token.

## Architecture

Ditto is an elastic supply currency forked from [Ampleforth](https://www.ampleforth.org/). The original architecture has been simplified into two main contracts:

1. [DittoToken](Ditto.sol) - ERC20 token that implements the rebase function.
2. [DittoMaster](Master.sol) - Contains the rebase configuration and admin functionality.

The third necessary component is the price Oracle. The [MarketOracle](MarketOracle.sol) smart contract provides the functionality for calculating an average price using the Uniswap TWAP Oracle interface.

## Configuration

- Rebase lag:
- Rebase 

## Deployment


### Intial distribution lock

Transferring DittoTokens is initially restricted to the owner. This is to allow an orderly distribution via airdrops, token sale, etc., while preventing users from listing Ditto on AMMs ahead of the Ditto team. Once the distribution lock has been released bu the contract creator it cannot be re-engaged.

## Ditto on the BSC Testnet
