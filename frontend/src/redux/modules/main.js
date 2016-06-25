import { createAction, handleActions } from 'redux-actions'
import { CALL_API } from 'redux-api-middleware'

import getApiPath from '../../helpers/getApiPath';
import getFetchOptions from '../../helpers/getFetchOptions';
import { getQuery } from '../../helpers/getQuery';


// ------------------------------------
// Constants (Action Types)
// ------------------------------------
const FETCH_LOGIN_INFO_REQUEST = 'FETCH_LOGIN_INFO_REQUEST'
const FETCH_LOGIN_INFO_SUCCESS = 'FETCH_LOGIN_INFO_SUCCESS'
const FETCH_LOGIN_INFO_FAILURE = 'FETCH_LOGIN_INFO_FAILURE'


// ------------------------------------
// Actions (Action Creator)
// ------------------------------------
export const fetchLoginInfo = (appCode) => {

	let params, sid = getQuery('sid'), ticket = getQuery('ticket'), o = getQuery('o');

	// 未登录时，会跳转到passport进行登录，然后再回到当前页面，这个时候，需要把登录参数回传到后台
	if (sid && ticket && o) {
		params = {sid, ticket, o}
	}

	let fetchOptions = getFetchOptions(getApiPath('api/user/info', params))

	return {
		[CALL_API]: {
			...fetchOptions,
			types: [
				{
					type: FETCH_LOGIN_INFO_REQUEST,
					payload: () => appCode
				},
				{
					type: FETCH_LOGIN_INFO_SUCCESS,
					payload: (state, action, json) => {
						let data = json.data, loginInfo = null, navs = [], menus = []
						
						if(data){
							
							loginInfo = {
								tenantName: data.tenant_name,
								tenantCode: data.tenant_code,
								displayName: data.display_name,
								companyName: data.company_name
							}
				
							let app_func = data.app_func, apps = app_func.apps

							//组装navs数据
							for(let key in apps){
								let app = apps[key]
								navs.push({code: app.app_code, name: app.app_name, url: app.site_url, active: key === app_func.current_app_code })
								
							}

							//把data.functions转成树结构数组，方便后面遍历生成DOM
							if(Array.isArray(app_func.functions) && app_func.functions.length > 0){
								app_func.functions.forEach(item => {
									if(item.level === '1'){
										menus.push({name: item.func_name, url: item.func_url, icon: item.icon, children: []})
									}else{
										menus[menus.length - 1].children.push({name: item.func_name, url: item.func_url})
									}
								})
							}							
							
						}

						return {loginInfo, navs, menus}
					}
				},
				FETCH_LOGIN_INFO_FAILURE
			]
		}
	}
}

/**
 * 暴露actions到外面，方便使用react-redux connect绑定到Container Component
 */
export const actions = {
  fetchLoginInfo
}

// ------------------------------------
// Reducers
// ------------------------------------
const initialState = {
  loginInfo: null,
  navs: null,
  menus: null,
  pending: false
}

export default handleActions({
	
	[FETCH_LOGIN_INFO_REQUEST] (state, { payload }) {
		// 在切换应用时，会重新加载数据，加载前，这里把相应nav.active重新赋值，方便页面更新UI
		if (state.navs && payload) {
			let navs = state.navs.map(nav => {
				return {...nav, active: nav.code === payload}
			})

			return {...state, navs, pending: true}
		}

		return {...state, pending: true}
	},

	[FETCH_LOGIN_INFO_SUCCESS] (state, { payload }) {
		return {...payload, pending: false}
	},

	[FETCH_LOGIN_INFO_FAILURE] (state) {
		return {...state, pending: false}
	}

},initialState)
