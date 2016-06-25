module.exports = {
  path: 'bin',
  childRoutes: [{
    path: 'create',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/bin/AddOrEdit').default)
      })
    }
  }, {
    path: 'edit/:binId',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/bin/AddOrEdit').default)
      })
    }
  }]
}