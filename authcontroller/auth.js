
var passport = require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\config\\passport\\passport.js");
var path = require("path");
var db = require("C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\models");
module.exports = function (app, passport) {
    //



    app.get("/",function(req,res){

        res.render("homePage.ejs" , {user : req.user})
    })

    app.get("/logout", function (req, res) {
        console.log("Log Out Route Hit");
        req.session.destroy(function (err) {
            if (err) console.log(err)
            res.redirect('/');
        });
    });


    app.post('/',
        // wrap passport.authenticate call in a middleware function
            // call passport authentication passing the "local" strategy name and a callback function
            passport.authenticate('local-signin', { successRedirect: '/',
                failureRedirect: '/login' }));


        // function to call once successfully authenticated



    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');

    }
}