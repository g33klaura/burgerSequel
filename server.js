// Server.js - initial starting point for the Node/Express server

// REQUIREMENTS
// ==========================================
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

let PORT = process.env.PORT || 3000;


// SETUP
// ==========================================
const app = express();

// Require models for syncing
let db = require('./models');
// var db = require('./models/burger.js');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Set default handlebars template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static('public'));


// ROUTING
// ==========================================
// Import routes and give the server access to them
// ****This was from old Burger app-- still use???
// Allows templates to render... doesn't work if switched to burger-api-routes...
var routes = require('./controllers/burgers_controller.js');
// var routes = require('./routes/burger-api-routes.js');
app.use('/', routes);

// ******HAVEN'T WRITTEN SOME ROUTES YET******
// TURN THEM BACK ON WHEN WRITTEN*************
// require('./routes/html-routes.js')(app);
// require('./routes/customer-api-routes.js')(app);
require('./routes/burger-api-routes.js')(app);

// app.listen(PORT, function() {
//   console.log('App listening on PORT: ' + PORT);
// });

// Syncing our sequelize models and then starting our Express app
// ==========================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});