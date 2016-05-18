var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from Genre GROUP BY genre_name;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.Insert = function(genre_name, movie_id, callback) {
    console.log("We are logging: ", genre_name);
    var qry_params = [genre_name, movie_id];
    console.log("We are also logging: ", qry_params);
    connection.query('INSERT INTO Genre (genre_name, movie_id) VALUES (?, ?)', qry_params, function(err, result){
        callback(err, result);
    });
}