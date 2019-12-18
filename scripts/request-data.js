const WrappedHBAR = artifacts.require('WrappedHBAR')
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config({path: "../.env"});

const url = "https://api.dragonglass.me/hedera/api/transactions?accountTo=0.0.28503&transactionTypes=CONTRACT_CALL&sortBy=desc"

const key = {
	"X-API-KEY": process.env.ACCESS_TOKEN
}

const options = {
    headers: key
};

const getData = async url => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

var data,size = 0,topics = 'a8126f7572bb1fdeae5b5aa9ec126438b91f658a07873f009d041ae690f3a193';
var params;
var addr,amount;

/*
  This script allows for a Chainlink request to be created from
  the requesting contract. Defaults to the Chainlink oracle address
  on this page: https://docs.chain.link/docs/testnet-oracles
*/

const oracleAddress = '0x0ca1E5ee14f3f03d515DB23cFD507641B9a393ba'
const jobId = '712279bec797491fa3c963ab5df8c43b'
const payment = '1000000000000000000'
const path = 'data'
const times = process.env.TRUFFLE_CL_BOX_TIMES || '100000000'

module.exports = async callback => {
  const mc = await WrappedHBAR.deployed()

  console.log("Listening for transactions on hedera");
  data = await getData(url);
  console.log(data)

  // New tx is added
  if (data.size > size){
    // let diff = data.size - size;
    size = data.size;

    // If size is changed by n then we should iterate through top n but for now, i am assuming that traffic is not much on hedera so n most of the times = 1
    // for (var i =0; i < diff; i++) {
    if(data.data[0].logInfo[0].topics[0] != null) {
      topic = data.data[0].logInfo[0].topics[0];
      if (topic == topics){
        params = data.data[0].functionParameters;
        addr = '0x' + params.slice(32, 72);
        amount = '0x' + params.slice(72, 136);
        amount = parseInt(amount, 16);
        console.log(amount);
      }
    }
  }
  console.log(addr);
  console.log('Creating request on contract:', mc.address)
  const tx = await mc.requestToken(
    oracleAddress,
    web3.utils.toHex(jobId),
    payment,
    url,
    path,
    times,
    addr
  )
  callback(tx.tx)
}