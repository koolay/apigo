import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './redux/configureStore';
import { DEV, baseAlias } from './config'
// import { getQuery } from './helpers/getQuery'
// import Token from './helpers/token'

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

/**
 * 系统应用菜单中，不是默认的NAV项时，会带有_ac参数过来，这里把_ac参数统一加到前端路由去
 */
// // if (appCode) {
//   history.listen(location => {
//     let query = location.query || {}
//     if (query['_ac']) {
//       // 从菜单项过来，可能当前_ac参数会被改变，这里缓存起来，方便在子页面做内页跳转时，可以取到正确的_ac参数
//       Token.setAppCode( query['_ac'] )
//     } else {
//       // 这里需要使用history.replace()，不然会导致路由跳转后，无法回退到上一个页面，这是因为它回退的路由地址就是没带_ac参数的那个地址，这样它又被重定向了。。。
//       let appCode = Token.getAppCode();
//       appCode && history.replace({...location, query: {...query, _ac: appCode}})
//     }
//   })
// // }

// /**
//  * 从地址获取租户代码并保存，方便后面使用
//  */
// let token = location.pathname.split('/')[1]

// if ( token && token !== baseAlias.substr(1) ) {
//   Token.set( token )
// }

const routes = require('./routes/index')

function devTools() {
  if ( DEV ) {
  	const DevTools = require('./containers/DevTools').default;
	  return <DevTools/>
  }

  return null
}

ReactDOM.render(
  <Provider store={store}>
	  <div>
	  	<Router history={history} routes={routes} />
			{devTools()}
	  </div>
  </Provider>,
  document.getElementById('root')
)