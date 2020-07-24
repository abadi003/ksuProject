var bCrypt = require('bcrypt-nodejs');
var passport = require("passport");
var mysql = require('mysql')
var sql = require("../../dataBase")

// function to be called while there is a new sign/signup
// We are using passport local signin/signup strategies for our app
module.exports = function (passport, auth) {
    var Auth = auth;

    var LocalStrategy = require('passport-local').Strategy;

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'id',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function (req, userId, password, done) {
            var Auth = auth;

            var sha = "sha1(\"" + password + "\")"

            Auth.findOne({
                where: {
                    userId: userId
                }
            }).then(function (user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }

                sql.sql(password , function (result) {
                    console.log(result == user.password)
                    if (result == user.password){
                        done(null , user);
                    }else {
                        done(null , false);
                    }
                })







            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        done(null , id);
    });


}
