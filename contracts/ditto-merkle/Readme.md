# Ditto Markle Drop

Liquidity providers who stake on ditto.money earn a share of a rewards pool that contains a fixed amount of BNB or tokens. A snapshot of LPs is taken at a predetermined time (the first reward emission will happen on **January 25th, 2020**). 

Each LP gets assigned a **proportional amount of the reward based on their number of staking shares and time the shares were held at snapshot time.** This value is represented by the user's ```stakingShareSeconds``` variable.

**A user's bonus pool share is given by:**
```stakingShareSeconds / totalStakingShareSeconds```

Where ```totalStakingShareSeconds``` is the sum of the ```stakingShareSeconds``` of all users. The function query(adddress) in the staking contract returns the stakingShareSeconds for a given address,

### How to use

There are two pieces of information that the migrations depend on and both are set in contract-config.js, the `tokenAddress` and `merkleRoot`. `tokenAddress` is the address for the DITTO token and the `merkleRoot` instructions are given below.


### Generating the merkle root and the JSON file

This Uniswap repo (https://github.com/Uniswap/merkle-distributor) contains the contract that we vendored in this repo. It also contains scripts to convert a json object of { walletAddress: tokenAmount } into the merkle object. In order to generate that object:

1. In the scripts/ folder run `python csv_to_json.py` to convert our csv with columns `wallet` and `tokens` to a uniswap script compatible { walletAddress: tokenAmount } object.
2. In the `merkle-distributor` repo under scripts/ run `tsc` to generate the node.js files.
3. Run `node generate-merkle-root.js -i allocation_output.json >> allocation_merkle_output.json` to get the merkle object
4. Run `node verify-merkle-root.js -i allocation_merkle_output.json` against the output merkle json object to verify it's validity.
5. Once the validation passes, the object is finalized and the merkle root hash can be used

### Mainnet artifacts

All data for claim distribution on mainnet is in `./mainnet-artifacts/`
**Need csv data with Gathering users script**
