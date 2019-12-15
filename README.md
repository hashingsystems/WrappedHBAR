# WrappedHBAR - A cross-EVM Token Transfer solution


These are some smart contracts used for testing purposes for cross-chain token transactions.

Hedera contract is a bank that holds HBAR for the user. A user can initiate can lock up their HBAR and mint it to an Ethereum Address. This even should be caught by the oracle (not implemented here yet) and broadcasted to the Ethereum contract. 

The Ethereum contract is an ERC20-compliant contract with minting and burning functionality. When burning tokens: User sends amount to burn and (Hedera) address to debit. This is caught by the oracle and broadcasted to the Hedera contract.


Please note: 
- The Eth version is missing functions to conform to the ERC20 standard.
- These contracts need to be tested and shouldn't be completely trusted for edge cases.