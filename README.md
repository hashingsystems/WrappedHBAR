# WrappedHBAR - A cross-EVM Token Transfer solution


## Userflow

- Go to https://beta.hashingsystems.com/#deployed-contracts and deploy `contracts/hedera/HederaBank.sol` from the console.

- Then go to **Deployed Contracts** section to find your deployed contract there with it's address. Call it's deposit method with the amount of hbar you want to deposit.
![](https://i.imgur.com/0ggCPCd.png)
Once you accept, that amount will be deposited into this contract and you can call `balance` to confirm your deposit.

- Now call method `remit` with params `account`(the ethereum address you want to move funds to) and `amount`(how much you want to move).
_Note: Call this method with some hbar oherwise the tx won't show up in dragonglass_

- Now coming back to our porject repo https://github.com/nanspro/WrappedHBAR, go to the top directory and deploy our WrappedHBAR contract to ropsten.

First set env variables in .env,
```
MNEMONIC=<YOUR_PRIVATE_KEY>
ETH_RPC_URL=https://ropsten.infura.io/v3/<INFURA_PROJECT_ID>
ACCESS_TOKEN=<DRAGONGLASS_API_ACCESS_TOKEN>
```
```bash
$ truffle migrate --reset --network ropsten
```

***Note the contract address and fund it with $link tokens on ropsten. Here's the faucet, https://ropsten.chain.link/***
<br/>
**Temporary Setup**
Now before we go ahead, we need to start our local chainlink node and run our dragonglass adpater too, instructions are given in [Chainlink](./Chainlink.md)

**Helper Scripts**
- Calling remit emitted an event `LogDepositMade`, we have a listener script which listens to this event the topic for this event is `a8126f7572bb1fdeae5b5aa9ec126438b91f658a07873f009d041ae690f3a193`
- In `scripts/listener.js` we listen for updates from the contract through dragonglass api, if we found a contract all with such topic then we fetch the param `account` (ethereum address) and trigger the oracle with that value.

_Note: The listener script is having some trouble continously listening for events cause infinite loop is not possible on truffle-scripts. So for now just run `npx truffle exec scripts/request-data.js --network ropsten ` to read the latest change from hedera contract._

- After running `scripts/request-data.js`, you'll notice that it fetched the address and amount correctly from `HederaBank`'s remit method call. It then calls the `requestToken` method of contract `WrappedHBAR` with address of account it fetched from hedera transaction's log and some other params related to oracles and stuff.
- If you go to your chainlink node dashboard, you can see that it recevived the request and it'll process that in few seconds. Once it is successful go and check your ethereum account in which you were supposed to get WHBAR.
_Note: You can add your `WrappedHBAR` contract address in metamask too to see your funds there_

- You can also transfer this WHBAR between accounts
- If you call `withdrawToken` method of `WrappedHBAR` then that will burn your WHBAR and will emit an event for the same.