var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/create', function(req, res) {
  res.render('userFormCreate.ejs', {title: 'User Create'});
});
router.get('/save', function(req, res, next) {
  console.log("firstname equals: " + req.query.fname);
  console.log("the lastname submitted was: " + req.query.lname);
  console.log("the email address submitted was: " + req.query.email);
  console.log("the password submitted was: " + req.query.password);
  userDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully saved the user.");
    }
  });
});


module.exports = router;
