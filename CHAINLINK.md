## Development

To use external adapters we'll have to run our chainlink node. https://docs.chain.link/docs/node-operators

Add jobs and then view their runs by running `request-data.js`

#### 1. Have a chainlink node running

1. Start a local chainlink node. Instructions here https://docs.fiews.io/docs/run-a-chainlink-node-from-scratch
2. Send ETH to your node on the network you plan on using, it will need some gas money to send a response

#### 2. Run your adaptor locally

1. Set your `ACCESS_TOKEN` as env variable 
1. Have the external adaptor(s) running locally
2. On your node operator dashboard go to `Bridges` --> `Add Bridge` and fill in the details. For the bridge url use `[YOUR_IP_ADDRESS]:port` where your adaptor is running. Be sure to use your ip address and not `localhost`

#### 3. Add a job

1. Once the bridge is added, create a new job on the dashboard a paste the contents of `job.json` into the json blob space.
2. Copy the job id and paste it into `scripts/request-data.js`

#### 4. Check your node with provided scripts

1. Set env variables `MNEMONIC` and `RPC_URL` like so: `export RPC_URL="https://ropsten.rpc.fiews.io/v1/free"` and `export MNEMONIC='[YOUR MNEMONIC]`
2. Deploy your contract using `npm run migrate:live` and fund your contract with LINK https://ropsten.chain.link (for ropsten)
2. Run helper scripts (see below)

## Testing

For deploying to live networks, Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Set your environment variables `$RPC_URL` and `$MNEMONIC` before running:

```bash
npm run migrate:live
```

#### Helper Scripts

There are 3 helper scripts provided with this box in the scripts directory:

- `fund-contract.js`
- `request-data.js`
- `read-contract.js`

They can be used by calling them from `npx truffle exec`, for example:

```bash
npx truffle exec scripts/fund-contract.js --network live
```
_Note: You can directly send test link to this address by fetching it from faucet_

The CLI will output something similar to the following:

```
Using network 'live'.

Funding contract: 0x972DB80842Fdaf6015d80954949dBE0A1700705E
0xd81fcf7bfaf8660149041c823e843f0b2409137a1809a0319d26db9ceaeef650
Truffle v5.0.25 (core: 5.0.25)
Node v10.15.1
```

In the `request-data.js` script, example parameters are provided for you. You can change the oracle address, Job ID, and parameters based on the information available on [our documentation](https://docs.chain.link/docs/testnet-oracles).

```bash
npx truffle exec scripts/request-data.js --network live
```

This creates a request and will return the transaction ID, for example:

```
Using network 'live'.

Creating request on contract: 0x972DB80842Fdaf6015d80954949dBE0A1700705E
0x828f256109f22087b0804a4d1a5c25e8ce9e5ac4bbc777b5715f5f9e5b181a4b
Truffle v5.0.25 (core: 5.0.25)
Node v10.15.1
```

After creating a request on a live network, you will want to wait 3 blocks for the Chainlink node to respond. Then call the `read-contract.js` script to read the contract's state.

```bash
npx truffle exec scripts/read-contract.js --network live
```

Once the oracle has responded, you will receive a value similar to the one below:

```
Using network 'live'.

21568
Truffle v5.0.25 (core: 5.0.25)
Node v10.15.1
```