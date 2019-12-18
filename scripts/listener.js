const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

// const WrappedHBAR = artifacts.require('WrappedHBAR')

const url = "https://api.dragonglass.me/hedera/api/transactions?accountTo=0.0.28503&transactionTypes=CONTRACT_CALL&sortBy=desc"

const key = {
	"X-API-KEY": process.env.ACCESS_TOKEN
}

const options = {
    headers: key
};


// const oracleAddress = '0x0ca1E5ee14f3f03d515DB23cFD507641B9a393ba'
// const jobId = '53f62d753de641c5ab7947c7f9c335fc'
// const payment = '1000000000000000000'
// const path = 'data.data'
// const times = '2'

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

async function watch(){
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
          let addr = '0x' + params.slice(32, 72);
          let amount = '0x' + params.slice(72, 136);
          console.log(addr);
          amount = parseInt(amount, 16);
          console.log(amount);
        }
      }
      // }
    }
    setTimeout(watch, 10000);
}

watch();