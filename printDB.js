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

cmdStr = 'SELECT * FROM Flashcards';
db.all(cmdStr, function(err, rowData) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
  console.log("got: ", rowData, "\n");
  });

