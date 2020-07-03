# WrappedHBAR - A cross-EVM Token Transfer solution


initial explanation

### Deposits

step 1: deposit hbar to the contract

memo field needs to have the address of the beneficiary, aka the account the wrapped hbar will be made available to

```
let data = {
      contractid: "0.0.87289",
      memo: "0x48Ee94796a5b760f1dA95bb0d60170EDe8D2160d",
      params: "[\"0x48Ee94796a5b760f1dA95bb0d60170EDe8D2160d\"]",
      paymentserver: "https://mps.hashingsystems.com",
      abi: "[{\"constant\":false,\"name\":\"deposit\",\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\",\"inputs\":[{\"name\":\"account\",\"type\":\"string\"}]}]",
      amount: 5000001
    }
  hash.triggerSmartContract(data, (err,res)=>{
      err ? renderError(err):renderSuccess(res);
  });
  ```
  
step 2: find the tx hash from dragonglass or kabuto through their APIs

Example: https://testnet.dragonglass.me/hedera/transactions/00307071593804837736000000

step 3: Interact with the Etheruem (Rinkeby) contract
Address At: 0xe8c55b1a7dcf47f413989659be747a720afa7056

Call the verifyDeposit function, send 0.01 eth as well (to pay for inner transactions, otherwise you may get out of gas exception), using the following ABI

ex: https://rinkeby.etherscan.io/tx/0x54160d33939dec13160fa27941b5106b034239d66c705ad0a24569574bf4127d

```
{
  "constant": false,
  "inputs": [
    {
      "internalType": "string",
      "name": "txHash",
      "type": "string"
    }
  ],
  "name": "verifyDeposit",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}
```

Step 4: Query Ethereum to find the callback from the TEE. It will contain a bytes32 referring to the work done by the secure module.
ex: https://rinkeby.etherscan.io/tx/0x63600e3b49f56355ee9231c0b5efe394c671c4c1920437c86a943b3739c499ab (you can click "see more")

the value in the example is: 3cb08a96d67afe02a7b54e32cfe96aa33db854f10798c75c83dfb5fe3800f490

Step 5: Call `___callback` function with that bytes32 value. it will verify the information (costs around 220k gas because of all the strings in the http request).

So we call it like this: 0x3cb08a96d67afe02a7b54e32cfe96aa33db854f10798c75c83dfb5fe3800f490, we add 0x because HEX.

```
{
  "constant": false,
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "myid",
      "type": "bytes32"
    }
  ],
  "name": "___callback",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}
```
wHBAR will be minted to the beneficiary account. We can call the balanceOf for 0x48Ee94796a5b760f1dA95bb0d60170EDe8D2160d and see it has 5000001 tinybar.

### Withdrawals

step 1 call the withdraw function on the smart contract on Ethereum, make sure you have enough wHBAR. The accountId is the HEX encoded version of the 0.0.XX value (function example here: https://cdn.hashingsystems.com/hash.js)

```
{
  "constant": false,
  "inputs": [
    {
      "internalType": "string",
      "name": "amount",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "accountId",
      "type": "string"
    }
  ],
  "name": "withdraw",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}
```

step 2: query the next function with the parameters. It will contain a signed receipt.



