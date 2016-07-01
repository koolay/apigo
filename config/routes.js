module.exports.routes = {

  '/': 'HomeController.index',

  'post /login': 'UsersController.login',
  'post /signup': 'UsersController.signup',

  //path
  'get /api/apis': 'ApiController.list',
  'get /api/apis/:id': 'ApiController.detail',
  'post /api/apis': 'ApiController.create',
  'get /api/swagger/:id': 'ApiController.swagger',

  //mock
  'get /api/mocks': 'MockController.list',
  'post /api/mocks': 'MockController.create',
  'delete /api/mock/remove': 'MockController.remove',
  '/mock/:pathname':'MockController.view',
  'get /mock/test':'MockController.test',

   //创建项目
  'post /projects': 'ProjectController.create',
  'get /projects/:id': 'ProjectController.swagger'

};
