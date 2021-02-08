var express = require('express');
var router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

 /* GET home page. */
router.get('/', isAuthenticated, (req, res, next) => {
  res.render('welcome', {title:'Bienvenida'});
          });


module.exports = router;
