var express = require('express');
var router = express.Router();
var moboDal = require('../model/mobo_dal');

router.get('/all', function(req, res) {
    moboDal.GetAll(function (err, result) {
            if (err) {
                res.send("Error" + err.message);
            }
            else {
                res.render('displayAllMobos.ejs', {rs: result});
            }
        }
    );
});

router.get('/create', function(req, res) {
    res.render('moboCreate.ejs', {title: 'Mobo Insert'});
});

router.post('/save', function(req, res, next) {
    console.log("model_name: " + req.body.model_name);
    console.log("the model_name submitted was: " + req.body.socket_type);
    moboDal.Insert(req.body.model_name, req.body.socket_type, req.body.price, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the mobo.");
        }
    });
});
module.exports = router;