// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================



let express = require("express");


// Import Handlebars
let exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================


let app = express();


let cors = require("cors")
let passport   = require('passport');


let session    = require('express-session');
let bodyParser = require('body-parser');
let env = require('dotenv');
let PORT = process.env.PORT || 3;


// Requiring our models for syncing


let db = require("./models");
app.use(cors())


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

try {
  db.sequelize.sync({ force: false }).then(function() {
    let User = require('./models/user') (db.sequelize , db.Sequelize);
    console.log("hi done sync")
    let category = require ('./models/category')(db.sequelize , db.Sequelize);
    let wholeItem = require('./models/whole_item')(db.sequelize , db.Sequelize);
    let cart = require('./models/cart')(db.sequelize , db.Sequelize);
    require("./config/passport/passport")(passport, User);

// Routes
// =============================================================

    require("./authcontroller/auth")(app,passport);
    app.listen(PORT, process.env.IP, function() {
        console.log("App listening on PORT " + PORT);
    });
    app.use(express.static("Public"));
});
} catch (error) {
  console.log(error)
}
