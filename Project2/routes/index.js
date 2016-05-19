var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title : 'Parts Master'
  }
  if(req.session.account === undefined) {
    res.render('index', data);
  }
  else {
    data.fname = req.session.account.custName;
    res.render('index', data);
  }
});

router.get('/aboutuslink', function(req, res, next) {
  res.render('aboutUs.ejs', { title: 'Project 2'});
});

router.get('/authenticate', function(req, res) {
  userDal.GetByCust(req.query.custName, req.query.password, function (err, account) {
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
module.exports = router;
