const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12a n f012345"
});
con.connect()
exports.sql = function sql(msg , callback) {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "12a n f012345"
    });
    con.connect()
        con.query("SELECT sha1(\"" + msg + "\")", function (err, result, fields) {
            if (err) throw err;
                callback(result[0]["sha1(\"" + msg + "\")"])
        });
   

}


exports.que = function que(result) {



}
