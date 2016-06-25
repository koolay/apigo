import getBasePath from '../helpers/getBasePath'

/**
 * root router
 */
module.exports = {
  path: getBasePath(),
  component: require('../views/layouts/Main').default,
  childRoutes: [
    require('./examples'),
    require('./norights'),
    require('./404')
  ]
}