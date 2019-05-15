// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";

const db = new sqlite3.Database(dbFileName, (err) => {
	if(err){
		console.error(err.message);
	}
	console.log('Connected to the database');
});

db.run(`INSERT INTO Flashcards(name) VALUES(?)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
