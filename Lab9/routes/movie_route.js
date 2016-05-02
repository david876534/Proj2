var express = require('express');
var router = express.Router();
var movieDal = require('../model/movie_dal');

router.get('/all', function(req, res) {
    movieDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllMovies.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    movieDal.GetByID(req.query.movie_id, function (err, result) {
            if (err) throw err;
            res.render('displayMovieInfo.ejs', {rs: result, movie_id: req.query.movie_id});
        }
    );
});

router.get('/create', function(req, res) {
    res.render('movieFormCreate.ejs', {title: 'Movie Create'});
});

router.get('/save', function(req, res, next) {
    console.log("movie_title equals: " + req.query.movie_title);
    console.log("the tagline submitted was: " + req.query.tagline);
    movieDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the movie.");
        }
    });
});
module.exports = router;