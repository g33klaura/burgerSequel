// Set up MySQL connection.
var mysql = require('mysql');

var connection;

// Connect with JawsDB if deployed on Heroku
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
// Else connect locally
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'burgers_db'
  });
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


// EXPORTS =============================================
//
// Export connection for our ORM to use.
module.exports = connection;
