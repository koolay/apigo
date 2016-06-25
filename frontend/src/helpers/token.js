// import Cookies from 'js-cookie'

let __token

class Token {
	set(token) {
	  this.token = token
	}

	get() {
		return this.token || ''
	}

	setAppCode(appCode) {
		this.appCode = appCode
	}

	getAppCode() {
		return this.appCode
	}

	// getAccessToken() {
	// 	return Cookies.get('BIGDATA') || ''
	// }
}

function createToken() {
	return __token ? __token : (__token = new Token())
}

export default createToken()