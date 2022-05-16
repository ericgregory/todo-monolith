var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "octoberfest",
    database: "todo_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
    let dbSetup = "CREATE DATABASE IF NOT EXISTS todo_db ";
    con.query(dbSetup);
    let query = "CREATE TABLE IF NOT EXISTS Todo (task_id int NOT NULL AUTO_INCREMENT, task VARCHAR(255) NOT NULL, status VARCHAR(255), PRIMARY KEY (task_id))";
    con.query(query, (err, result)=>{
      if (err) throw err;
      console.log(result)
  })
});

module.exports = con;