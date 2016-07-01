module.exports = {
  path: 'bin',
  childRoutes: [{
    path: 'list',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/bin/List').default)
      })
    }
  }, {
    path: 'define(/:binId)',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/bin/Define').default)
      })
    }
  }]
}