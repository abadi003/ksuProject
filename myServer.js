const express = require('express');
const passport = require('passport');
var session = require('express-session')
var bodyParser = require('body-parser')
const localSQL = require('passport-local-mysql');
const sequelize = require('sequelize');
const env = require('dotenv');
const port = 3;
const app = express();
var exphbs = require('express-handlebars')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var models = require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});
app.use(session({
    secret: 'abadi',
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {

    res.render("homepage.ejs");

});

//Models

//Routes

var authRoute = require('C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\authcontroller\\auth.js')(app);


//load passport strategies

require('C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\config\\passport\\passport.js')(passport, models.user);

// expose this function to our app using module.exports
app.use(express.static("Public"))
app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});
// app.post("/",  passport.authenticate('local-signin' , {
//     successRedirect: 'https://euw.op.gg/summoner/userName=abadi3',
//     failureRedirect: '/'
// }), function (req , res) {
//
// })
// app.get("/", function (req , res) {
// res.render("homePage.ejs")
// })
