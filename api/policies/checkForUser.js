/**
 * checkForUser
 *
 * @module      :: Policy
 * @description :: Simple policy to load an authenticated user, if any.  If we're not logged in, just continue.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {

    var token = '';
    if (req.header('authorization')) {
        // If one exists, attempt to get the header data
        token = req.header('authorization').split('Bearer ')[1];
    } else {
        token = req.cookies.token;
    }
    console.log(token);
    // Check for a JWT token in the header
    if (token) {
        return jwt.verify(token, sails.config.jwtSecret, function(err, payload) {
            if (err) {
                if (req.wantsJSON) {
                    return res.send(401);
                }
                // Otherwise if this is an HTML-wanting browser, do a redirect.
                return res.redirect('/login');
            }
            if (!payload.user) {return next();}
            User.findOne(payload.user, function(err, user) {
                if (err) {return res.negotiate(err);}
                if (!user) {return res.next();}
                // Save the user object on the request (i.e. "log in") and continue.
                req.user = user;
                return next();
            });
        });
    }
    if (req.wantsJSON) {
        return res.send(401);
    }
    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/login');

};
