const express = require('express')
const port = 52560; 

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.phrase != undefined) {
        let temp = qObj.phrase;
	get_translation(temp,res);
    }
    else {
	next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
 
////

function get_translation(instring,res){

		const APIrequest = require('request');
		const http = require('http');

		const APIkey = "AIzaSyDZJDlLpGWdRPQKVpmWLlFtGc-eh4QDpp4";  // ADD API KEY HERE
		const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

//		instring = "Hello Kirsten";

		// An object containing the data expressing the query to the
		// translate API. 
		// Below, gets stringified and put into the body of an HTTP PUT request.
		let requestObject = 
			{
			"source": "en",
			"target": "hi",
			"q": [
				`${instring}`
			]
			}

		console.log("English phrase: ", requestObject.q[0]);
		
		
				
		// The call that makes a request to the API
		// Uses the Node request module, which packs up and sends off
		// an HTTP message containing the request to the API server
		APIrequest(
			{ // HTTP header stuff
				url: url,
				method: "POST",
				headers: {"content-type": "application/json"},
				// will turn the given object into JSON
				json: requestObject	},
			// callback function for API request
			APIcallback
			);

			// callback function, called when data is received from API
			function APIcallback(err, APIresHead, APIresBody) {
			console.log("in the callback function");
			// gets three objects as input
			if ((err) || (APIresHead.statusCode != 200)) {
				// API is not working
				//console.log("Got API error");
				//console.log(APIresBody);
			} else {
				if (APIresHead.error) {
				// API worked but is not giving you data
				//console.log(APIresHead.error);
				} else {
				console.log("In Hindi: ", 
					APIresBody.data.translations[0].translatedText);
				//res.json({ "translation": APIresBody.data.translations[0].translatedText} );
				//console.log("\n\nJSON was:");
				//console.log(JSON.stringify(APIresBody, undefined, 2));
				// print it out as a string, nicely formatted
				res.json( {"translation":APIresBody.data.translations[0].translatedText});
				}
			}
		} // end callback function

	console.log("made the request");
}

