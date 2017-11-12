// Routes for displaying and saving data to the db

// REQUIREMENTS
// ==========================================
// Requiring the models
const db = require('../models');


// ROUTES
// ==========================================
module.exports = function(app) {

	// GET route for displaying all burgers
	app.get('/api/burgers', function(req, res) {
    var query = {};
    if (req.query.customer_id) {
      query.CustomerId = req.query.customer_id;
    }
    db.Burger.findAll({
      where: query,
      include: [db.Customer]
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

	// POST route for saving a new burger
	// ****Does this need each specific input part (ie. burger_name, devoured)???
  app.post('/api/burgers', function(req, res) {
    db.Burger.create(req.body).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // PUT route for updating devoured status
  app.put('/api/burgers', function(req, res) {
    db.Burger.update(
      // req.body,
      req.body.devoured,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbBurger) {
        res.json(dbBurger);
      });
  });
} //Closes module.exports