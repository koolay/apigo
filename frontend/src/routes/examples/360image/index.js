module.exports = {
  path: '360image',
  childRoutes: [{
  	path: 'list',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/360image/List').default)
      })
    }
  }, {
  	path: 'detail/:dataImageId',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/360image/Detail').default)
      })
    }
  }]
}