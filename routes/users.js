var express = require('express');
var router = express.Router();

const User = require('../model/User');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

/* GET users listing. */
router.get('/login', (req, res) => {
   res.render('login');
});

//Solicitud para logearse en el sitio
router.post('/login', passport.authenticate('local', {
  successRedirect: '/welcome',
  failureRedirect: '/users/login',
  failureFlash: false
}));

//Cerrar la sesion
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;



