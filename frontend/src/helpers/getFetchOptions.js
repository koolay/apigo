import { DEV } from '../config'

export default function getFetchOptions(endpoint, method='GET', opts={}) {
	// let DEV = process.env.NODE_ENV !== 'production'
	let headers = opts.headers || {}
	let defaultOptions = {
		...opts,
		endpoint: endpoint,
		method: method, 
		credentials: DEV ? 'include' : 'same-origin', //cookie，开发环境下，因为需要跨域，所以使用include		
		headers: {
			...headers, 
			"Accept": "ajax", 
			"Content-Type": headers['Content-Type'] || "application/json"
		}
	}

	return defaultOptions
}