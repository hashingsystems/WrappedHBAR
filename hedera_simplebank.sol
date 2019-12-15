pragma solidity ^0.4.13;
contract SimpleBank {

    /* Fill in the keyword. Hint: We want to protect our users balance from other contracts*/
    mapping (address => uint) private balances;

    /* Let's make sure everyone knows who owns the bank. Use the appropriate keyword for this*/
    address public owner;

    // Events - publicize actions to external listeners
    /* Add 2 arguments for this event, an accountAddress and an amount */
    event LogDepositMade(address accountAddress, uint amount);

    // Constructor, can receive one or many variables here; only one allowed
    function SimpleBank() public {
        /* Set the owner to the creator of this contract
         */
        owner = msg.sender;
    }

    /// @notice remit hbar to cross chain transaction
    /// @dev This does not return any excess hbar sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @param externalEthereum account to be credited on the Eth chain
    /// @return The balance remaining for the user
    function remit(uint withdrawAmount, address externalEthereum) public returns (uint remainingBal) {
        /* If the sender's balance is at least the amount they want to withdraw,
           Subtract the amount from the sender's balance, and try to send that amount of hbar
           to the user attempting to redeem on the Ethereum chain. IF the send fails, add the amount back to the user's balance
           return the user's balance.*/
        address user = msg.sender;
        
        // require(withdrawAmount >= owner.balance);
        require(balances[user] >= withdrawAmount);

        balances[user] -= withdrawAmount;
        
        // transfer the amount to the owner
        balances[owner] += withdrawAmount;

        return balances[user];
    }
    
    
    /// @notice transfer hbar between users
    /// @dev This does not return any excess hbar sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @param externalEthereum account to be credited on the Eth chain
    /// @return The balance remaining for the user
    function transfer(uint transferAmount, address localUser) public returns (uint remainingBal) {
        /* If the sender's balance is at least the amount they want to withdraw,
           Subtract the amount from the sender's balance, and try to send that amount of hbar
           to the user attempting to redeem on the Ethereum chain. IF the send fails, add the amount back to the user's balance
           return the user's balance.*/
        address user = msg.sender;
        
        // require(withdrawAmount >= owner.balance);
        require(balances[user] >= withdrawAmount);

        balances[user] -= withdrawAmount;
        
        // transfer the amount to the user
        balances[localUser] += withdrawAmount;

        return balances[user];
    }

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    // Add the appropriate keyword so that this function can receive ether
    function deposit() public payable returns (uint) {
        /* Add the amount to the user's balance, call the event associated with a deposit,
          then return the balance of the user */
        address user = msg.sender;

        balances[user] += msg.value;

        emit LogDepositMade(user, msg.value);

        return balances[user];
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        /* If the sender's balance is at least the amount they want to withdraw,
           Subtract the amount from the sender's balance, and try to send that amount of ether
           to the user attempting to withdraw. IF the send fails, add the amount back to the user's balance
           return the user's balance.*/
        address user = msg.sender;
        
        // require(withdrawAmount >= owner.balance);
        require(balances[user] >= withdrawAmount);

        balances[user] -= withdrawAmount; 
       
        user.transfer(withdrawAmount);
    
        return balances[user];
    }

    /// @notice Get balance
    /// @return The balance of the user
    // A SPECIAL KEYWORD prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance() public view returns (uint) {
        /* Get the balance of the sender of this transaction */
        address user = msg.sender;
        
        return balances[user];
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function () public {
        revert();
    }
}