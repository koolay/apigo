module.exports = {
  path: 'tag',
  childRoutes: [{
  	path: 'list',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/tag/List').default)
      })
    }
  }, {
    path: 'add',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/tag/AddOrEdit').default)
      })
    }
  }, {
    path: 'edit/:populationTagId',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/tag/AddOrEdit').default)
      })
    }
  }]
}