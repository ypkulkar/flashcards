// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.
var commands = 2;

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
let cmdStr = ['CREATE TABLE Flashcards (user TEXT, english TEXT, hindi TEXT, seen INT, correct INT)',
	'CREATE TABLE Usernames (user TEXT, username TEXT, last_seen INT)'];

db.run(cmdStr[0],tableCreationCallback);

db.run(cmdStr[1],tableCreationCallback);
// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database Table created");
	if(commands <= 1){
		db.close();
	}else{
		commands--;
	}
    }
}
