const WrappedHBAR = artifacts.require('WrappedHBAR')

/*
  This script allows for a Chainlink request to be created from
  the requesting contract. Defaults to the Chainlink oracle address
  on this page: https://docs.chain.link/docs/testnet-oracles
*/

const oracleAddress =
  process.env.TRUFFLE_CL_BOX_ORACLE_ADDRESS ||
  '0x0ca1E5ee14f3f03d515DB23cFD507641B9a393ba'
const jobId =
  process.env.TRUFFLE_CL_BOX_JOB_ID || '53f62d753de641c5ab7947c7f9c335fc'
const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'
// const url =
//   process.env.TRUFFLE_CL_BOX_URL ||
//   'https://api.dragonglass.me/hedera/api/transactions?accountFrom=0.0.27992&transactionTypes=CONTRACT_CALL'
const url = 'https://api.dragonglass.me/hedera/api/contracts/0.24586/callCount'
const path = process.env.TRUFFLE_CL_BOX_JSON_PATH || 'data.data'
const times = process.env.TRUFFLE_CL_BOX_TIMES || '2'

module.exports = async callback => {
  const mc = await WrappedHBAR.deployed()
  console.log('Creating request on contract:', mc.address)
  const tx = await mc.createRequestTo(
    oracleAddress,
    web3.utils.toHex(jobId),
    payment,
    url,
    path,
    times,
  )
  callback(tx.tx)
}