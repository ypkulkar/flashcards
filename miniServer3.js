const express = require('express')
const port = 52560;
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";

const db = new sqlite3.Database(dbFileName, (err) => {
	if(err){
		console.error(err.message);
	}
	console.log('Connected to the database');
});

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    if (qObj.phrase != undefined) {
        let temp = qObj.phrase;
		get_translation(temp,res);
    }
    else {
		next();
    }
}

function storeCard(req, res, next) {
	let sObj = req.query;
        let url = req.url;
	if (sObj.engPhrase != undefined && sObj.hinPhrase != undefined) {
		let engPhrase = sObj.engPhrase;
		let hinPhrase = sObj.hinPhrase;
		cmdStr = 'INSERT INTO Flashcards(user, english, hindi, seen, correct) VALUES(1,@0,@1,0,0)';
		db.run(cmdStr, engPhrase, hinPhrase, function(err) {
			if (err) {
			  return console.log(err.message);
			}
			// get the last insert id
			console.log(`A row has been inserted with rowid ${this.lastID}`);
			res.end();
		  });
			}
    else {
		next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    console.log("url= "+url);
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.post('/store', storeCard);	    // is it a valid request to store a card?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
 
////

function get_translation(instring,res){

		const APIrequest = require('request');
		const http = require('http');

		const APIkey = "AIzaSyDZJDlLpGWdRPQKVpmWLlFtGc-eh4QDpp4";  // ADD API KEY HERE
		const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

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
			// gets three objects as input
			if ((err) || (APIresHead.statusCode != 200)) {
				// API is not working
			} else {
				if (APIresHead.error) {
				// API worked but is not giving you data
				//console.log(APIresHead.error);
				} else {
				console.log("In Hindi: ", 
					APIresBody.data.translations[0].translatedText);
				// print it out as a string, nicely formatted
				res.json( {"translation":APIresBody.data.translations[0].translatedText});
				}
			}
		} // end callback function

}

