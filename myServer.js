// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
// Import Handlebars
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv');
var PORT = process.env.PORT || 3;


// Requiring our models for syncing
var db = require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\models");


// Sets up the Express app to handle data parsing


// For passport
app.use(session({ secret: 'keyboard cat',resave: false, saveUninitialized:false})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\config\\passport\\passport.js")(passport, db.User);
//
// // Routes
// // =============================================================
//
// require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\authcontroller\\auth.js")(app,passport);

//load passport strategies


// Set Express to use Handlebars engine to generate HTML layouts

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    var User = require('C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\models\\user.js') (db.sequelize , db.Sequelize);
    console.log(User);
    require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\config\\passport\\passport.js")(passport, User);

// Routes
// =============================================================

    require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\authcontroller\\auth.js")(app,passport);
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
    app.use(express.static("Public"));
});