var authController = require('C:\\Users\\KRB\\OneDrive\\Pictures\\ksu project\\authcontroller\\authcontroller.js');

module.exports = function(app, passport) {
passport = require('passport');

    app.get('/signin', authController.signin);



    app.get('/dashboard', isLoggedIn, authController.dashboard);



    app.get('/logout', authController.logout);


    app.post('/signin', function(req, res, next) {
        passport.authenticate('local-signin', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.json({status: 'error', message: info.message});
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json({status: 'ok'});
            });
        })(req, res, next);
    });

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

}