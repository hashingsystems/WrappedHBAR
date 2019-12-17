pragma solidity >=0.4.21 <0.6.0;

/**
 * Utility library of inline functions on addresses
 */
library Address {
   
  function isContract(address _addr) internal view returns (bool) {
        uint256 size;
        assembly {size := extcodesize(_addr)}
        return size > 0;
    }
    
}
