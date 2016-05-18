var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title : 'CS355'
  }
  if(req.session.account === undefined) {
    res.render('index', data);
  }
  else {
    data.fname = req.session.account.fname;
    res.render('index', data);
  }
});
/* GET home page. */
router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs', { title: 'cs355'});
});
router.get('/authenticate', function(req, res) {
  userDal.GetByEmail(req.query.email, req.query.password, function (err, account) {
    if (err) {
      res.send(err);
    }
    else if (account == null) {
      res.send("User not found.");
    }
    else {
      req.session.account = account;
      if(req.session.originalUrl = '/login') {
        req.session.originalUrl = '/'; //don't send user back to login, instead forward them to the homepage.
      }
      res.redirect(req.session.originalUrl);
      //res.send(account);
    }
  });
});

router.get('/login', function(req, res) {
  res.render('login.ejs');
});
router.get('/logout', function(req, res) {
  var data = {
    title : 'CS355'
  }
  req.session.destroy( function(err) {
    res.render('logout.ejs', data);
  });
});

module.exports = router;
