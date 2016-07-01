module.exports.routes = {

  '/': 'HomeController.index',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',

  //path
  'get /apis': 'ApiController.list',
  'get /apis/:id': 'ApiController.detail',
  'post /apis': 'ApiController.create',
  
  //mock
  'get /api/mocks': 'MockController.list',
  'get /api/mock/create': 'MockController.create',
  'get /api/mock/remove': 'MockController.remove',
  'get /mock/:mockid':'MockController.view',

   //创建项目
  'post /projects': 'ProjectController.create',
  'get /projects/:id': 'ProjectController.swagger'

};
