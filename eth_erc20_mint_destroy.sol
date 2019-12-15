pragma solidity ^0.4.24;

contract ERC20_mintable {
    mapping(address => uint256) public balances;
    mapping(address => mapping (address => uint256)) public allowed;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    address private owner;

    uint256 private constant MAX_UINT256 = 2**256 - 1;

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Mint(address indexed to, uint value);
    event Destroy(address indexed to, uint value);

    constructor(uint256 initialAmount, string tokenName, uint8 decimalUnits, string tokenSymbol)
        public
    {
        balances[msg.sender] = initialAmount;
        totalSupply = initialAmount;
        name = tokenName;
        decimals = decimalUnits;
        symbol = tokenSymbol;
        owner = msg.sender;
    }

    function transfer(address to, uint256 value)
        public returns (bool)
    {
        require(balances[msg.sender] >= value);
        require(msg.sender == to || balances[to] <= MAX_UINT256 - value);

        balances[msg.sender] -= value;
        balances[to] += value;

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function balanceOf(address _owner)
        public view returns (uint256)
    {
        return balances[_owner];
    }

    function mint(address to, uint256 amount)
        public returns (bool)
    {
        require(totalSupply <= MAX_UINT256 - amount);
        require(balances[to] <= MAX_UINT256 - amount);
        require(msg.sender == owner);

        totalSupply += amount;
        balances[to] += amount;

        emit Mint(to, amount);
        emit Transfer(0, to, amount);
        return true;
    }
    
    function remit(address from, uint256 amount, address externalHedera)
        public returns (bool)
    {
        require(totalSupply - amount >= 0);
        require(balances[from] - amount >= 0);

        totalSupply -= amount;
        balances[from] -= amount;

        emit Destroy(from, amount);
        emit Transfer(from, 0, amount);
        return true;
    }
}
