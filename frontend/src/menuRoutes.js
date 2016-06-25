/**
 * 由于菜单只能匹配一个地址，但某些菜单下的子页面可能是在内页中跳转，可能使用当前菜单无法高亮，这里另作配置，详见PageMenu.jsx实现
 * @type {Object}
 */
module.exports = {
  /**
   * key，菜单地址（不需把bastPath，以及它的查询参数写上，在PageMenu中会处理），value，正则表达式，用来匹配页面路由地址
   */
  '/examples/tag/list': '\/examples\/tag\/.*',
  '/examples/360image/list': '\/examples\/360image\/.*'
}