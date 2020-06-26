var exports = module.exports = {}


exports.signin = function(req, res) {

    res.redirect("/signinabadi")

}


exports.dashboard = function(req, res) {

    res.redirect("/dashboard")

}
exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}