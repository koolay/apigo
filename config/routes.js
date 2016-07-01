module.exports.routes = {

  '/': 'HomeController.index',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',

  '/go': 'MockController.go',

  'get /apis': 'ApiController.list',
  'get /apis/:id': 'ApiController.detail',
  'post /apis': 'ApiController.create',
  
  'get /api/mocks': 'MockController.list',
  'get /api/mock': 'MockController.create',

   //创建项目
  'post /projects': 'ProjectController.create',
  'get /projects/:id': 'ProjectController.swagger'

};
