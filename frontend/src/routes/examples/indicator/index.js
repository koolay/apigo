module.exports = {
  path: 'indicator',
  childRoutes: [{
  	path: 'list',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../../views/examples/indicator/List').default)
      })
    }
  }]
}