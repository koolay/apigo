module.exports = {
  path: 'mockapi',
  childRoutes: [{
    path: 'list/:binId',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/mock/list').default)
      })
    }
  }, {
    path: 'create/:binId(/:mockId)',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/mock/Create').default)
      })
    }
  }]
}