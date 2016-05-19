var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * FROM Motherboard";
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.Insert = function(model_name, socket_type, price, callback){
    console.log("We are logging: ", model_name);
    var qry_params = [model_name, socket_type, price];
    connection.query('INSERT INTO Motherboard (model_name, socket_type, price) VALUES (?, ?, ?)', qry_params, function(err, result){
        callback(err, result);
    });
}