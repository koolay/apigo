module.exports.routes = {

  // HTML Views
  '/': 'PageController.main',
  'get /main': 'PageController.main',
  'get /login': 'PageController.login',
  'get /signup': 'PageController.signup',
  '/logout': 'PageController.logout',
  '/profile': 'PageController.profile',

  // Endpoints
  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',
};
