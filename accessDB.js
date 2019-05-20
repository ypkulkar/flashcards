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

cmdStr = 'INSERT INTO Flashcards(user, english, hindi, seen, correct) VALUES(1,@0,@1,0,0)';
db.run(cmdStr, "hi yash", "hi yash in hindi", function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
