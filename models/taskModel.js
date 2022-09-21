// Requires db driver

var mysql = require('mysql2');

// Establishes db connection

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "octoberfest",
    database: "todo_db"
});

// Creates the database schema for the todos app

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
    let query = "CREATE TABLE IF NOT EXISTS Todo (task_id int NOT NULL AUTO_INCREMENT, task VARCHAR(255) NOT NULL, status VARCHAR(255), owner_id VARCHAR(255), PRIMARY KEY (task_id))";
    con.query(query, (err, result)=>{
      if (err) throw err;
      console.log(result)
  })
});

// Exports connection variable

module.exports = con;