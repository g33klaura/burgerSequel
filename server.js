// Starting point script

// REQUIREMENTS ========================================
//
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

let PORT = process.env.PORT || 3000;


// SETUP ===============================================
//
const app = express();

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Set default handlebars template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// ROUTING =============================================
//
// Import routes and give the server access to them
var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

// app.listen(PORT);
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});