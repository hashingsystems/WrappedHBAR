const request = require("request")
const dotenv = require('dotenv');
dotenv.config({path: "../.env"});

const createRequest = (input, callback) => {

	// Create the URL for the request
	let url = "https://api.dragonglass.me/hedera/api/transactions?accountTo=0.0.28503&transactionTypes=CONTRACT_CALL&sortBy=desc"
	// let endpoint = ""
	// url = url + endpoint
	
	const key = {
		"X-API-KEY": process.env.ACCESS_TOKEN
	}
	var amount;

	const options = {
    	url: url,
		headers: key,
		json: true
	}

	request(options, (error, response, body) => {
		amount = body.data[0].functionParameters;
		amount = '0x' + amount.slice(72,136);
		amount = parseInt(amount, 16);
		
		// Add any API-specific failure case here to pass that error back to Chainlink
		if (error || response.statusCode >= 400) {
			callback(response.statusCode, {
				jobRunID: input.id,
				status: "errored",
				error: body,
				statusCode: response.statusCode
      })
		} else {
			console.log(body);
			console.log(amount);
			callback(response.statusCode, {
				jobRunID: input.id,
				data: amount,
				statusCode: response.statusCode
			})
		}
	})
}

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
	createRequest(req.body, (statusCode, data) => {
		res.status(statusCode).send(data)
	})
}

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
	createRequest(event, (statusCode, data) => {
		callback(null, data)
	})
}

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
	createRequest(JSON.parse(event.body), (statusCode, data) => {
		callback(null, {
			statusCode: statusCode,
			body: JSON.stringify(data),
			isBase64Encoded: false
		})
	})
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest