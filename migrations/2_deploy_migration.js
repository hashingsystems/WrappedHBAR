let WrappedHBAR = artifacts.require('WrappedHBAR')

const DECIMALS = 8;
const SYMBOL = "WHBAR";
const NAME = "Wrapped HBAR";

module.exports = (deployer, network) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  if (!network.startsWith('live')) {
    return deployer.deploy(WrappedHBAR, "0x20fE562d797A42Dcb3399062AE9546cd06f63280", NAME, SYMBOL, DECIMALS)
  } else {
    // For live networks, use the 0 address to allow the ChainlinkRegistry
    // contract automatically retrieve the correct address for you
  }
}
