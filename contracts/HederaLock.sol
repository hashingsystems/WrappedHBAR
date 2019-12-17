pragma solidity 0.4.24;

import "./Ownable.sol";

contract HederaLock is Ownable {

    mapping (address => uint) private balances;

    address public owner;

    // Emitted when someone wishes to move funds
    event LogDepositMade(address account, uint amount);

    // Constructor, can receive one or many variables here; only one allowed
    constructor() {
        /* Set the owner to the creator of this contract
         */
        owner = msg.sender;
    }

    // Move funds to ethereum
    function remit(address account, uint amount) public payable returns (uint) {
        address user = msg.sender;
        require(balances[user] >= amount, "Insufficient funds");
        balances[user] -= amount;

        emit LogDepositMade(account, amount);
        return balances[user];
    }

    // Deposit funds in this contract
    function deposit() public payable returns (uint) {
        address user = msg.sender;
        balances[user] += msg.value;
        return balances[user];
    }

    function transfer(uint amount, address localUser) public returns (uint) {
        address user = msg.sender;
        require(balances[user] >= amount, "Insufficient funds");
        balances[user] -= amount;

        // transfer the amount to the user
        balances[localUser] += amount;

        // Returns remaining balance
        return balances[user];
    }

    function withdraw(uint amount) public returns (uint) {
        address user = msg.sender;

        require(balances[user] >= amount, "Insufficient funds");

        balances[user] -= withdrawAmount;

        user.transfer(amount);

        return balances[user];
    }

    function balance() public view returns (uint) {
        address user = msg.sender;

        return balances[user];
    }

    function () public {
        revert("Call an proper function");
    }
}