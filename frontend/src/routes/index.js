/**
 * root router
 */
module.exports = {
  path: '/',
  component: require('../views/layouts/Main').default,
  indexRoute: {
  	component: require('../views/Index').default
  },
  childRoutes: [
    require('./examples'),
    require('./bin'),
    require('./mock/list'),
    require('./norights'),
    require('./404')
  ]
}