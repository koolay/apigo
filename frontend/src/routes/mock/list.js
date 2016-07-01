module.exports = {
  path: 'mock',
  childRoutes: [{
  	path: 'list',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/mock/list').default)
      })
    }
  }]
}