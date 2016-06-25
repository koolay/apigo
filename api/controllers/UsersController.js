/**
 * UsersController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
module.exports = {

    /**
     * `UserController.login()`
     */
    login: function(req, res) {

        // Look up the user
        User.attemptLogin({
            usernameOrEmail: req.param('email'),
        }, function(err, user) {
            if (err) return res.negotiate(err);
            if (!user) {
                return res.json({
                    result: false,
                    msg: 'invalid username or password'
                });
            }
            User.comparePassword(req.param('password'), user, function(err, valid) {
                if (err) {
                    return res.json(403, {
                        err: 'forbidden'
                    });
                }
                if (!valid) {
                    return res.json({
                        result: false,
                        msg: 'invalid username or password'
                    });
                } else {
                    var token = jwt.sign({
                        user: user.id
                    }, sails.config.jwtSecret, {
                        expiresIn: sails.config.jwtExpires
                    });
                    res.cookie('token', token);
                    return res.json({
                        result: true,
                        msg: '',
                        data: {
                            token: token
                        }
                    });
                }

            });

        });

    },


    /**
     * `UserController.logout()`
     */
    logout: function(req, res) {

        // "Forget" the user from the session.
        // Subsequent requests from this user agent will NOT have `req.session.me`.
        req.session.me = null;

        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a simple response letting the user agent know they were logged out
        // successfully.
        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('/');
    },


    /**
     * `UserController.signup()`
     */
    signup: function(req, res) {

        // Attempt to signup a user using the provided parameters
        User.signup({
            username: req.param('username'),
            email: req.param('email'),
            password: req.param('password')
        }, function(err, user) {
            // res.negotiate() will determine if this is a validation error
            // or some kind of unexpected server error, then call `res.badRequest()`
            // or `res.serverError()` accordingly.
            if (err) return res.negotiate(err);

            // Go ahead and log this user in as well.  We do this by issuing a JWT token for them.
            var token = jwt.sign({
                user: user.id
            }, sails.config.jwtSecret, {
                expiresIn: sails.config.jwtExpires
            });
            return res.json({
                result: true,
                data: {
                    token: token,
                    user: user
                }
            });
        });
    }
};
