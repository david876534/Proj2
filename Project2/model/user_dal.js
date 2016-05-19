var mysql = require('mysql');
var db = require('./db_connection.js');

/*Database config */
var connection = mysql.createConnection(db.config);

exports.GetByCust = function(custName, password, callback) {
    var query = 'CALL Account_GetByName(?, ?)';
    var query_data = [custName, password];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        else if(result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
};