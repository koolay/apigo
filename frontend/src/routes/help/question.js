module.exports = {
  path: 'help',
  childRoutes: [{
    path: 'question',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../../views/help/question').default)
      })
    }
  }]
}