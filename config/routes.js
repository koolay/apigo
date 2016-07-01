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
  'get /api/mock': 'MockController.create',
  'get /mock/:mockid':'MockController.apimock',

   //创建项目
  'post /projects': 'ProjectController.create',
  'get /projects/:id': 'ProjectController.swagger'

};
