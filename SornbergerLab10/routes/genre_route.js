var express = require('express');
var router = express.Router();
var genreDal = require('../model/genre_dal');


router.get('/new', function(req, res) {
    res.render('genre_insert_form', {title: 'Genere In'});
});

router.get('/genre_insert', function(req, res){
    genreDal.Insert(req.query.genre_name, 12, function(err, result){
        var response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = 'Success!';
        }
        res.json(response);
    });
});


module.exports = router;