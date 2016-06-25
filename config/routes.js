module.exports.routes = {

  '/': 'HomeController.index',
  '/list': 'HomeController.list',
  '/create': 'HomeController.create',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',
};
