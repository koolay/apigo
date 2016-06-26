module.exports.routes = {

  '/': 'HomeController.index',
  '/list': 'HomeController.list',
  '/create': 'HomeController.create',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',

  '/go': 'ApiController.go',
  'get /apis/list': 'ApiController.list',
  'get /apis/:id': 'ApiController.detail',
  'post /apis': 'ApiController.create',

};
