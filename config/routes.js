module.exports.routes = {

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
    '/mock/:pathname': 'MockController.view',
    'get /mock/test': 'MockController.test',

    //mock
    'get /api/mocks': 'MockController.list',
    'post /api/mocks': 'MockController.create',
    'get /api/mock/remove': 'MockController.remove',
    '/mock/:pathname': 'MockController.view',
    'get /mock/test': 'MockController.test',

    //docs
    'get /docs/:project_id': 'DocsController.view',

    //apiTest
    'get /apitest/:pathid': 'ApiTestController.apitest',
    'get /apitestjson/:id': 'ApiTestController.apiTestJson',

    //创建项目
    'post /projects': 'ProjectController.create',
    'get /projects/:id': 'ProjectController.swagger',

    '/*': {
        view: 'index',
        skipAssets: true,
        skipRegex: /(^\/api\/.*$)|(^\/docs\/.*$)|(^\/mock\/.*$)/,
    },
};
