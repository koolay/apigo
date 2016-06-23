/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  main: function (req, res) {
    return res.view('main');
  },
  login: function(req, res) {
    if (req.user) {return res.redirect('/home');}
    return res.view('user/login', {layout:null});
  },
  logout: function(req, res) {
    return res.view('user/logout');
  },
  signup: function(req, res) {
      if (res.method == 'POST') {
         return res.view('user/signup', {msg: 'success'});
      } else {
        return res.view('user/signup', {layout:null});
      }
  },
  profile: function(req, res) {
    return res.view('user/profile');
  }
};

