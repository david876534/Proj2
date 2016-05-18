var express = require('express');
var router = express.Router();
var movieDal = require('../model/movie_dal');
var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    movieDal.GetAll(function (err, result) {
        if (err) {
            res.send("Error" + err.message);
        }
        else {
            res.render('displayAllMovies.ejs', {rs: result});
        }
        }
    );
});


router.get('/', function (req, res) {
    console.log(req.query.movie_id);
    if(req.query.movie_id == null){
        res.redirect('/movie/all')
    }
    else{
        movieDal.GetByID(req.query.movie_id, function (err, result) {
                if (err) throw err;
                res.render('displayMovieInfo.ejs', {rs: result, movie_id: req.query.movie_id});
            }
        );
    }

});

router.get('/create', function(req, res) {
    genreDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('movie_insert_form.ejs', {genres: result, title: 'Movie Insert'});
        }
    });
});

router.post('/save', function(req, res, next) {
    console.log("movie_title equals: " + req.body.movie_title);
    console.log("the tagline submitted was: " + req.body.tagline);
    movieDal.Insert(req.body.movie_title, req.body.tagline, req.body.genres, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the movie.");
        }
    });
});

router.get('/edit', function(req, res){
    console.log('/edit movie_id:' + req.query.movie_id);

    movieDal.GetByID(req.query.movie_id, function(err, movie_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(movie_result);
            genreDal.GetAll(function(err, genre_result){
                console.log(genre_result);
                res.render('movie_edit_form', {rs: movie_result, genres: genre_result, message: req.query.message});
            });
        }
    });
});

// Added for Lab 10

router.post('/update_movie', function(req,res){
    console.log(req.body);
    // first update the movie
    movieDal.Update(req.body.movie_id, req.body.movie_title, req.body.tagline, req.body.genre_name,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';
            }
            // next update the genres
            movieDal.GetByID(req.body.movie_id, function(err, movie_info){
                genreDal.GetAll(function(err, genre_result){
                    console.log(genre_result);
                    res.redirect('/movie/edit?movie_id=' + req.body.movie_id + '&message=' + message);
                    //res.render('movie/movie_edit_form', {rs: movie_info, genres: genre_result});
                });
            });

        });
});

// Added for Lab 10

router.get('/delete', function(req, res){
    console.log(req.query);
    movieDal.GetByID(req.query.movie_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            movieDal.DeleteById(req.query.movie_id, function (err) {
                res.send(result[0].movie_title + ' Successfully Deleted');
            });
        }
        else {
            res.send('Movie does not exist in the database.');
        }
    });
});

module.exports = router;