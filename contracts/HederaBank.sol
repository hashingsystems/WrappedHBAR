pragma solidity 0.4.26;

contract Context {
    // Empty internal constructor, to prevent people from mistakenly deploying
    // an instance of this contract, which should be used via inheritance.
    constructor () internal { }
    // solhint-disable-previous-line no-empty-blocks

    function _msgSender() internal view returns (address) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return _msgSender() == _owner;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}


contract HederaBank is Ownable {

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

        balances[user] -= amount;

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