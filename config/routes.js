module.exports.routes = {

  '/': 'HomeController.index',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',

  '/go': 'MockController.go',

  'get /apis': 'ApiController.list',
  'get /apis/:id': 'ApiController.detail',
  'post /apis': 'ApiController.create',

   //创建项目
  'post /projects': 'ProjectController.create'

};
