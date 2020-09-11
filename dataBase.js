const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12012345"
});
con.connect()
exports.sql = function sql(msg , callback) {
        con.query("SELECT sha1(\"" + msg + "\")", function (err, result, fields) {
            if (err) throw err;
                callback(result[0]["sha1(\"" + msg + "\")"])
        });
   

}


exports.que = function que(result) {



}
