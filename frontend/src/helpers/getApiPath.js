import Token from './token'
import param from './param'
import { getQuery } from './getQuery'
import { apiDomain } from '../config'

/**
 * 
 * @param  {string} path
 * @param  {object} paramData
 * @return {string}        
 */
export default function getApiPath(path, paramData) {
	let token = Token.get(), 
		params, 
		basePath;
	
	if (token) {
		basePath = `${apiDomain}/${token}`
	} else {
		basePath = apiDomain
	}

	// 统一在请求api接口时，加上_ac参数
	const appCode = Token.getAppCode();

	if (appCode) {
		params = param( Object.assign(paramData || {}, { _ac: appCode }) )
	} else {
		params = param(paramData)
	}

	if (params) {
		params = path.indexOf('?') === -1 ? `?${params}` : `&${params}`
	}

	return `${basePath}/${path}${params}`
}