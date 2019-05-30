const express = require('express')

const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const port = 52560;
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";

// Google login credentials, used when the user contacts
// Google, to tell them where he is trying to login to, and show
// that this domain is registered for this service. 
// Google will respond with a key we can use to retrieve profile
// information, packed into a redirect response that redirects to
// server162.site:[port]/auth/redirect
const googleLoginData = {
    clientID: '708936518102-rjc3et58gb6ldrvhmf4p3vee772tio4o.apps.googleusercontent.com',
    clientSecret: '6_1YCZuWJEYG19_YXkXAfIL8',
    callbackURL: '/auth/redirect'
};

// Strategy configuration. 
// Tell passport we will be using login with Google, and
// give it our data for registering us with Google.
// The gotProfile callback is for the server's HTTPS request
// to Google for the user's profile information.
// It will get used much later in the pipeline. 
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

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
		cmdStr = 'INSERT INTO Flashcards(user, english, hindi, seen, correct) VALUES(@0,@1,@2,0,0)';
		console.log(req.session);
		console.log(req.user);
		db.run(cmdStr, req.session.passport.user, engPhrase, hinPhrase, function(err) {
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
//app.use(express.static('public'));  // can I find a static file? 

// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if 
// session is still going on. 
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));


// Initializes request object for further handling by passport
app.use(passport.initialize()); 

// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 

app.get('/query', queryHandler );   // if not, is it a valid query?
app.post('/store', storeCard);	    // is it a valid request to store a card?

// Public static files
app.get('/*',express.static('public'));

// next, handler for url that starts login with Google.
// The app (in public/login.html) redirects to here (not an AJAX request!)
// Kicks off login process by telling Browser to redirect to
// Google. The object { scope: ['profile'] } says to ask Google
// for their user profile information.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app. 

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other. 
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/hello.html');
	});

// static files in /user are only available after login
//app.get('/user/*',
app.get('/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	express.static('private') 
       ); 

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



// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let dbRowID = profile.id;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    done(null, dbRowID); 
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {userData: "find_this"};
    done(null, userData);
});
