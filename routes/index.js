const express = require('express'),
  router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'Home Page',
      is_logged_in: req.session.is_logged_in
    },
    partials:{
      partial: 'partial-index'
    }  
  });
});

module.exports = router;