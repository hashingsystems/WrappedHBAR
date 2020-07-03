# WrappedHBAR - A cross-EVM Token Transfer solution


initial explanation

step 1: deposit hbar to the contract

memo field needs to have the address of the beneficiary, aka the account the wrapped hbar will be made available to

``` let data = {
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

step 3: Interact with the Etheruem (Rinkeby) contract
Address At: 0xe8c55b1a7dcF47F413989659be747a720afA7056

Call the verifyDeposit function, send 0.01 eth as well (to pay for inner transactions, otherwise you may get out of gas exception), using the following ABI

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

Step 5: Call `___callback` function with that bytes32 value. it will verify the information (costs around 220k gas because of all the strings in the http request).

~~~ wHBAR will be minted to the beneficiary.

