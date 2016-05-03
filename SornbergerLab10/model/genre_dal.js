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
    console.log(genre_name);
    var qry = "INSERT INTO Genre (genre_name, movie_id) VALUES (?, ?)";
    connection.query(qry, genre_name, movie_id, function(err, result){
        callback(err, result);
    });
}