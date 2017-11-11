// REQUIREMENTS ========================================
//
// Import burger model script
var burger = require('../models/burger.js');

var express = require('express');
var router = express.Router();


// ROUTES ==============================================
//
// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  
  // this "selectAll" is defined in burger.js (THE MODEL)
  burger.selectAll(function(data) {

  	// ...probably 'handlebars Object'
    var hbsObject = {
    	// tableName as property
      burgers: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.insertOne([
    'burger_name', 'devoured'
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// EXPORTS =============================================
//
// Export routes for server.js
module.exports = router;
