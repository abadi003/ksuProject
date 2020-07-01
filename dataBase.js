const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12a n f012345"
});
exports.sql = function sql(msg , callback) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT sha1(\"" + msg + "\")", function (err, result, fields) {
            if (err) throw err;
                callback(result[0]["sha1(\"" + msg + "\")"])
        });
    });

}


exports.que = function que(result) {



}
