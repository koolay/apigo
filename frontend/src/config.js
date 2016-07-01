const DEV = process.env.NODE_ENV !== 'production'
module.exports = {
	serverHostName: null,
	serverPort: 5000,
	baseAlias: '',
	/**
	 * 请求api接口的域名地址，开发环境下，因为本地跑的node环境，需指定php环境的域名，以便能正确获取数据
	 */
	// apiDomain: DEV ? 'http://data-dev.vip.mypaas.com.cn' : '',
	apiDomain: DEV ? 'http://127.0.0.1:1337' : '',
	DEV
}