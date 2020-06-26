module.exports = function(passport, user) {

    var User = user;
    console.log(user);
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);

    });
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {
            console.log(User);

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, email, password, done) {

            var User = user;
            console.log(user);

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }


                var userinfo = user.get();
                return done(null, true);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));
}
