module.exports = {
  path: 'norights',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../views/NoRights').default)
    })
  }
}