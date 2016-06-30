module.exports = {
  path: 'bin',
  childRoutes: [{
    path: 'define(/:binId)',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/bin/Define').default)
      })
    }
  }]
}