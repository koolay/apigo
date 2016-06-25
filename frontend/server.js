const path = require('path');

const koa = require('koa');
const Router = require('koa-router');
const staticResources = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const config = require('./src/config');

const app = koa();

const __PROD__ = process.env.NODE_ENV === 'production';

/**
 * HTTP body parser
 */
app.use(bodyParser());

if(__PROD__){
	//压缩处理
	
	//静态文件
	app.use(staticResources(path.join(__dirname, '../')));
}else{
	const webpack = require('webpack');
	const devconfig = require('./webpack-dev.config');
	const compiler = webpack(devconfig);

	app.use(require('koa-webpack-dev-middleware')(compiler, {
	  // noInfo: true,
	  stats: {
	    colors: true
	  },
	  publicPath: devconfig.output.publicPath
	}));

	app.use(require('koa-webpack-hot-middleware')(compiler));
	app.use(require('koa-logger')());
}

// app.use(staticResources(path.join(__dirname, '../')));

render(app, {
  root: path.join(__dirname, './'),
  layout: false,
  viewExt: 'html',
  debug: true,
  cache: false
});


//==================================================
// api路由
//==================================================
let apiRouter = new Router({prefix: '/api'});

apiRouter.get('/user/info', function *(next) {
	let appCode = this.query['_ac'] || 'app1';
	let data = {
		app1: {"result":true,"msg":"","data":{"tenant_code":"data","display_name":"超级用户","company_name":"data","tenant_name":"data","app_func":{"apps":{"Passport":{"id":"39d01b19-cc2c-ff0a-041d-10b645b9efe5","app_code":"Passport","app_name":"管理中心","site_url":"http://passport-dev.vip.mypaas.com.cn"},"app1":{"id":"39d71a5a-c460-4d8b-5f36-fc89ca1eadb5","app_code":"app1","app_name":"应用1","site_url":"http://127.0.0.1:5000/static/examples/indicator/list?_ac=app1"},"app2":{"id":"39d71a5a-c460-4d8b-5f36-fc89ca1eadb5","app_code":"app2","app_name":"应用2","site_url":"http://127.0.0.1:5000/static/examples/page1?_ac=app2"}},"functions":[{"id":"1","func_name":"应用1","icon":"icon-indicator-data","level":"1"},{"id":"1-1","func_name":"基础指标","func_url":"http://127.0.0.1:5000/static/examples/indicator/list?_ac=app1","icon":"","level":"2"},{"id":"1-2","func_name":"客户360画像","func_url":"http://127.0.0.1:5000/static/examples/360image/list?_ac=app1","icon":"","level":"2"},{"id":"1-3","func_name":"客户标签管理","func_url":"http://127.0.0.1:5000/static/examples/tag/list?_ac=app1","icon":"","level":"2"}],"current_app_code":"app1"}}},
		app2: {"result":true,"msg":"","data":{"tenant_code":"data","display_name":"超级用户","company_name":"data","tenant_name":"data","app_func":{"apps":{"Passport":{"id":"39d01b19-cc2c-ff0a-041d-10b645b9efe5","app_code":"Passport","app_name":"管理中心","site_url":"http://passport-dev.vip.mypaas.com.cn"},"app1":{"id":"39d71a5a-c460-4d8b-5f36-fc89ca1eadb5","app_code":"app1","app_name":"应用1","site_url":"http://127.0.0.1:5000/static/examples/indicator/list?_ac=app1"},"app2":{"id":"39d71a5a-c460-4d8b-5f36-fc89ca1eadb5","app_code":"app2","app_name":"应用2","site_url":"http://127.0.0.1:5000/static/examples/page1?_ac=app2"}},"functions":[{"id":"1","func_name":"应用2","icon":"icon-indicator-data","level":"1"},{"id":"1-1","func_name":"页面1","func_url":"http://127.0.0.1:5000/static/examples/page1?_ac=app2","icon":"","level":"2"},{"id":"1-2","func_name":"页面2","func_url":"http://127.0.0.1:5000/static/examples/page2?_ac=app2","icon":"","level":"2"}],"current_app_code":"app2"}}}
	};

	this.body = data[appCode]
});

apiRouter.get('/indicator/list', function *(next) {
	this.body = {"result":true,"msg":"","data":{"total":58,"items":[{"id":"39d8a6ec-06ef-5c76-d6fe-1fe26c326d6f","name":"姓名","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-06ef-07a4-b1c0-36a80edcbbc3","name":"性别","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-06ef-ccff-26ea-f37426fef7cf","name":"生日","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"年龄段","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-dd0e-dfac-20d9b22773f9","name":"身份证号","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-5523-cd17-72b9119f7c0f","name":"其他证件类型","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-5f67-5c2d-30a968e422cc","name":"其他证件号码","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-e986-a7cc-0229e13147cd","name":"微信号","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-6bfd-cba6-91178a0940be","name":"移动电话","source":"云客","cate_sort":"1","cate_name":"基本信息"},{"id":"39d8a6ec-0ad7-c8ca-26c2-ba520093b483","name":"办公电话","source":"云客","cate_sort":"1","cate_name":"基本信息"}]}}
});

apiRouter.get('/indicator/all-indicator-types', function *(next) {
	this.body = {"result":true,"msg":"","data":[{"id":"39d81270-25b4-c6d2-f5b7-3ec371c0a7c6","name":"形容词","category_id":"39d8a6ec-06ef-6774-40bf-f51c03551bc0","remark":null,"sort":"11","default_show_analysis":"0","source":"自定义"},{"id":"39d81270-f252-bba8-7d03-7f34f3143118","name":"动词","category_id":"39d8a6ec-06ef-6774-40bf-f51c03551bc0","remark":null,"sort":"12","default_show_analysis":"0","source":"自定义"}]}
});

apiRouter.get('/indicator/all-indicators', function *(next) {
	this.body = {"result":true,"msg":"","data":[{"id":"39d8a6ec-06ef-7313-26ec-78aef9691064","name":"基本信息","remark":"基本信息","sort":"1","is_tag":"0","group_is_available":"1","indicators":[{"id":"39d8a6ec-06ef-07a4-b1c0-36a80edcbbc3","name":"性别","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":"","sort":"2","default_show_analysis":"1","source":"云客","values":[{"id":"39d8a6ec-06ef-1455-f4b3-2b5ef8289af3","indicator_id":"39d8a6ec-06ef-07a4-b1c0-36a80edcbbc3","name":"男","value":"1","remark":null,"sort":"1"},{"id":"39d8a6ec-06ef-715f-0bd6-c2ce701ce857","indicator_id":"39d8a6ec-06ef-07a4-b1c0-36a80edcbbc3","name":"女","value":"2","remark":null,"sort":"2"}]},{"id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"年龄段","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":"","sort":"4","default_show_analysis":"1","source":"云客","values":[{"id":"39d8a6ec-06ef-83cb-8ccd-6d718ca52177","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"25岁以下","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-06ef-2ccf-da1e-8453450954c6","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"25-30岁","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-06ef-2e82-7603-70065ee39c61","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"30-35岁","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-06ef-cd6b-eb5d-873e6b940a8f","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"35-40岁","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-06ef-c353-86aa-97d43b5d72e7","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"40-50岁","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-06ef-e983-f8fd-a09408fc5b05","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"50-60岁","value":"6","remark":"","sort":"6"},{"id":"39d8a6ec-06ef-ef6a-4b5e-c79dd008dfd9","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","name":"60岁以上","value":"7","remark":"","sort":"7"}]},{"id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"工作职业","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":"","sort":"18","default_show_analysis":"1","source":"云客","values":[{"id":"39d8a6ec-12a7-0f0b-fefa-97d17597e97f","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"学生","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-12a7-b213-2a0a-6a51e72a3856","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"普通职员","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-12a7-5f4c-76f0-bbeb201b9287","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"企业中高管理层","value":"3","remark":null,"sort":"3"},{"id":"39d8a6ec-12a7-3f84-105f-1ec8af661b93","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"自由职业者","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-12a7-9ef8-2899-b341161a7b93","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"公务员","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-12a7-a1c0-1e97-00a53858e578","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"部队","value":"6","remark":"","sort":"6"},{"id":"39d8a6ec-12a7-9ef8-2873-24812e6d426f","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"能源","value":"7","remark":"","sort":"7"},{"id":"39d8a6ec-12a7-ef7d-30be-e0d9af4c9081","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"制造业","value":"8","remark":"","sort":"8"},{"id":"39d8a6ec-12a7-1a50-a7a5-1bc3286d8466","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"传媒","value":"9","remark":"","sort":"9"},{"id":"39d8a6ec-12a7-4996-94f4-e26eb36911a4","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"金融","value":"10","remark":"","sort":"10"},{"id":"39d8a6ec-12a7-db66-18cb-a94f8004b341","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"房地产","value":"11","remark":"","sort":"11"},{"id":"39d8a6ec-12a7-01e9-bf4a-f4d90a7b9287","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"电子","value":"12","remark":"","sort":"12"},{"id":"39d8a6ec-12a7-2d12-0192-469f96ba8261","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"服务业","value":"13","remark":"","sort":"13"},{"id":"39d8a6ec-12a7-79e1-2e6c-fdb8b5ed0f1d","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"互联网","value":"14","remark":"","sort":"14"},{"id":"39d8a6ec-12a7-5811-90eb-4843b33cd007","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"物流","value":"15","remark":"","sort":"15"},{"id":"39d8a6ec-12a7-b64a-aab1-8cd033e3cb8c","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"农林牧渔","value":"16","remark":"","sort":"16"},{"id":"39d8a6ec-12a7-c01d-3d15-c5969118a23f","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"医疗","value":"17","remark":"","sort":"17"},{"id":"39d8a6ec-12a7-7fd8-a1c1-5eb61bbbe9a0","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"教育","value":"18","remark":"","sort":"18"},{"id":"39d8a6ec-12a7-637d-5665-b19257d4230d","indicator_id":"39d8a6ec-0ebf-c9dc-e718-9dca5230c327","name":"贸易","value":"19","remark":"","sort":"19"}]},{"id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"家庭结构","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":"","sort":"19","default_show_analysis":"1","source":"云客","values":[{"id":"39d8a6ec-0ebf-289b-47d2-9f7a790c19f8","indicator_id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"1人","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-0ebf-fd89-c76e-c62e96c04b04","indicator_id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"2人","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-0ebf-b2e7-fedf-857b8c92718a","indicator_id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"3人","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-0ebf-101b-a7cf-db79ca258006","indicator_id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"4人","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-0ebf-36a6-8ca4-f3adb7a0c164","indicator_id":"39d8a6ec-0ebf-441d-454d-a09523f7fac3","name":"4人以上","value":"5","remark":"","sort":"5"}]},{"id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"业务阶段","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":"","sort":"24","default_show_analysis":"1","source":"云客","values":[{"id":"39d8a6ec-12a7-c9df-970f-0d5a7d15eb5d","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"无效","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-12a7-a345-23fa-a96b96761cc1","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"问询","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-12a7-5c73-0ee3-a1d58f82a23d","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"看房","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-12a7-2888-6eb2-e7161a5201a8","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"认筹","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-12a7-e58e-3b64-828af661bc01","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"认购","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-12a7-bc02-2a36-c04c59840c1a","indicator_id":"39d8a6ec-12a7-0342-43a2-0f4da399840e","name":"签约","value":"6","remark":"","sort":"6"}]},{"id":"39d81707-17e0-8af5-3411-76f0941fdb64","name":"客户来源分类","category_id":"39d8a6ec-06ef-7313-26ec-78aef9691064","remark":null,"sort":"25","default_show_analysis":"1","source":"云客","values":[{"id":"39d81707-17e0-8565-c6ea-1ba81316f0a7","indicator_id":"39d81707-17e0-8af5-3411-76f0941fdb64","name":"自有","value":"1","remark":null,"sort":"1"},{"id":"39d81707-17e0-b8e4-1fe1-036c05c72fab","indicator_id":"39d81707-17e0-8af5-3411-76f0941fdb64","name":"推荐","value":"2","remark":null,"sort":"2"},{"id":"39d81707-17e0-18d0-edf9-854c8899aedf","indicator_id":"39d81707-17e0-8af5-3411-76f0941fdb64","name":"渠道","value":"3","remark":null,"sort":"3"}]}]},{"id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","name":"意向信息","remark":"意向信息","sort":"2","is_tag":"0","group_is_available":"1","indicators":[{"id":"39d8a6ec-12a7-3ac8-9dca-68a0bd702fee","name":"购房用途","category_id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","remark":"","sort":"1","default_show_analysis":"0","source":"云客","values":[{"id":"39d8a6ec-168f-536d-5a8f-c3134119e287","indicator_id":"39d8a6ec-12a7-3ac8-9dca-68a0bd702fee","name":"自用","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-168f-30b0-6201-bc2cd565e096","indicator_id":"39d8a6ec-12a7-3ac8-9dca-68a0bd702fee","name":"投资","value":"2","remark":"","sort":"2"}]},{"id":"39d8a6ec-168f-775c-30ee-0ff5215c329c","name":"意向等级","category_id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","remark":"","sort":"2","default_show_analysis":"0","source":"云客","values":[{"id":"39d8a6ec-168f-90c4-3b5c-6ff55eca6635","indicator_id":"39d8a6ec-168f-775c-30ee-0ff5215c329c","name":"无","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-168f-4c5f-f68d-e70f4b47e6e8","indicator_id":"39d8a6ec-168f-775c-30ee-0ff5215c329c","name":"一般","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-168f-701d-5a67-76ec61ba940b","indicator_id":"39d8a6ec-168f-775c-30ee-0ff5215c329c","name":"高","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-168f-fef8-0192-6d73e579dfad","indicator_id":"39d8a6ec-168f-775c-30ee-0ff5215c329c","name":"必买","value":"4","remark":"","sort":"4"}]},{"id":"39d8a6ec-168f-af65-d886-eb2faf1ff508","name":"意向户型","category_id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","remark":"","sort":"3","default_show_analysis":"0","source":"云客","values":[{"id":"39d8a6ec-168f-12f8-58e5-4ed1455f23fb","indicator_id":"39d8a6ec-168f-af65-d886-eb2faf1ff508","name":"一房","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-168f-ec9e-272f-83c90c2d161b","indicator_id":"39d8a6ec-168f-af65-d886-eb2faf1ff508","name":"两房","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-168f-8d13-3b4a-c341ec62e817","indicator_id":"39d8a6ec-168f-af65-d886-eb2faf1ff508","name":"三房","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-168f-6f1c-19f9-3b3830d9b47f","indicator_id":"39d8a6ec-168f-af65-d886-eb2faf1ff508","name":"四房及以上","value":"4","remark":"","sort":"4"}]},{"id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"意向面积","category_id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","remark":"","sort":"4","default_show_analysis":"0","source":"云客","values":[{"id":"39d8a6ec-168f-e261-78b4-c354da0a94e3","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"40平米以下","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-168f-b648-3cb9-4de53ae0bfef","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"40到60平米","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-168f-9700-5214-82a1c3f701ba","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"60到90平米","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-168f-94e3-db8d-faeb6483f692","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"90到130平米","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-168f-718b-5edf-c46925a95636","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"130到200平米","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-168f-9132-86eb-201bbd85690e","indicator_id":"39d8a6ec-168f-ecb9-1327-2ba66354c9c9","name":"200平米以上","value":"6","remark":"","sort":"6"}]},{"id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"意向价格","category_id":"39d8a6ec-06ef-83dc-fee1-2d3e54af22df","remark":"","sort":"5","default_show_analysis":"0","source":"云客","values":[{"id":"39d8a6ec-168f-a679-b5ed-e42454adb498","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"50万以下","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-168f-6baa-a96b-9289d9e1326e","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"50-80万","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-168f-addf-ac20-ee4e1312fac5","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"80-100万","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-168f-c1b9-104c-606604aee006","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"100-150万","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-168f-229c-9dfb-2ceab32a344f","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"150-200万","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-168f-5385-51e8-6d6eb1baa829","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"200-300万","value":"6","remark":"","sort":"6"},{"id":"39d8a6ec-168f-dca5-3729-f4e3b3694e12","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"300-500万","value":"7","remark":"","sort":"7"},{"id":"39d8a6ec-168f-cd58-f97d-568e12e71499","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"500-1000万","value":"8","remark":"","sort":"8"},{"id":"39d8a6ec-168f-690f-102f-c5d7191eaee3","indicator_id":"39d8a6ec-168f-9b08-e68c-d3dd4258008c","name":"1000万以上","value":"9","remark":"","sort":"9"}]}]},{"id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","name":"行为信息","remark":"行为信息","sort":"3","is_tag":"0","group_is_available":"1","indicators":[{"id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"最近全部行为距近日","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":"","sort":"1","default_show_analysis":"0","source":"ERP","values":[{"id":"39d8a6ec-1e5f-715c-5aa9-8162e693c8dc","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"3-","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-1e5f-c149-857b-93872dfc4553","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"4-7","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-1e5f-3f8f-d89a-db78873f982a","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"8-14","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-1e5f-244e-2732-6eca105c72cf","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"15-21","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-1e5f-da37-020f-373e3ca67887","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"22-28","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-1e5f-312e-7146-bc18c8b4b077","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"29-90","value":"6","remark":"","sort":"6"},{"id":"39d8a6ec-1e5f-8719-1eda-22dfc467b8b8","indicator_id":"39d8a6ec-1a77-36ce-c774-3c91ead90953","name":"90+","value":"7","remark":"","sort":"7"}]},{"id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"全部行为总次数","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":"","sort":"2","default_show_analysis":"0","source":"ERP","values":[{"id":"39d8a6ec-1e5f-f841-18cb-79f93b63551c","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"0","value":"1","remark":"","sort":"1"},{"id":"39d8a6ec-1e5f-ec61-8df9-693b343b2fc4","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"1","value":"2","remark":"","sort":"2"},{"id":"39d8a6ec-1e5f-83f5-4c73-287189f4dca6","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"2","value":"3","remark":"","sort":"3"},{"id":"39d8a6ec-1e5f-7745-5f3a-ef941d718a35","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"3","value":"4","remark":"","sort":"4"},{"id":"39d8a6ec-1e5f-661b-c01c-18dcfb32a1c1","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"4","value":"5","remark":"","sort":"5"},{"id":"39d8a6ec-1e5f-91fd-a39b-1a8d29df801d","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"5","value":"6","remark":"","sort":"6"},{"id":"39d8a6ec-1e5f-2b50-7a38-58e58de858fb","indicator_id":"39d8a6ec-1e5f-b64a-beb7-605f1f0ba83d","name":"5+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"最近来电距今日","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"3","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-1bc8-c47e-58f9-7d3f7d16312d","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"3-","value":"1","remark":"","sort":"1"},{"id":"39d81707-1bc8-44ee-6939-9c5ec75aa984","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"4-7","value":"2","remark":"","sort":"2"},{"id":"39d81707-1bc8-3844-f4f7-923e6cd7fe11","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"8-14","value":"3","remark":"","sort":"3"},{"id":"39d81707-1bc8-6358-cb91-2e843a08f980","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"15-21","value":"4","remark":"","sort":"4"},{"id":"39d81707-1bc8-1d17-5ac2-fc3133c90abf","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"22-28","value":"5","remark":"","sort":"5"},{"id":"39d81707-1bc8-e39c-8b62-d43af2580d9d","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"29-90","value":"6","remark":"","sort":"6"},{"id":"39d81707-1bc8-e423-0ee1-05f5f65db788","indicator_id":"39d81707-1bc8-aab1-91ff-665c2e565f0b","name":"90+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"来电总次数","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"4","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-1bc8-0217-454d-b8de6ba82759","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"0","value":"1","remark":"","sort":"1"},{"id":"39d81707-1bc8-3c8c-9246-762fc5beb5c4","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"1","value":"2","remark":"","sort":"2"},{"id":"39d81707-1bc8-96a4-f40a-690c2d02fdb5","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"2","value":"3","remark":"","sort":"3"},{"id":"39d81707-1bc8-064b-f1d6-c3105f4da4ad","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"3","value":"4","remark":"","sort":"4"},{"id":"39d81707-1bc8-8b34-1fe1-2cbbec6190bd","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"4","value":"5","remark":"","sort":"5"},{"id":"39d81707-1bc8-9a08-e6ba-7e57cb92718c","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"5","value":"6","remark":"","sort":"6"},{"id":"39d81707-1bc8-9e52-57ba-7d0216edd160","indicator_id":"39d81707-1bc8-9998-6ce9-9b193b2176f2","name":"5+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"最近去电距今日","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"5","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-1fb0-83e3-e146-78b5f1e88438","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"3-","value":"1","remark":"","sort":"1"},{"id":"39d81707-1fb0-6d45-2177-4666079df700","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"4-7","value":"2","remark":"","sort":"2"},{"id":"39d81707-1fb0-51c1-5d87-161ba80052e9","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"8-14","value":"3","remark":"","sort":"3"},{"id":"39d81707-1fb0-96d5-7a4e-e275abf1eb1d","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"15-21","value":"4","remark":"","sort":"4"},{"id":"39d81707-1fb0-30ea-1bd7-3f7fad885bc0","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"22-28","value":"5","remark":"","sort":"5"},{"id":"39d81707-1fb0-5ef6-8b8c-d29ca50679b5","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"29-90","value":"6","remark":"","sort":"6"},{"id":"39d81707-1fb0-c47c-01d2-9e3dcd29e3af","indicator_id":"39d81707-1fb0-36d7-008f-ac5b04aee3b4","name":"90+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"去电总次数","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"6","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-1fb0-3287-1911-8c9243a09287","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"0","value":"1","remark":"","sort":"1"},{"id":"39d81707-1fb0-04b2-fadb-37162e7e8580","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"1","value":"2","remark":"","sort":"2"},{"id":"39d81707-1fb0-d9de-3b64-6bbbff6646a7","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"2","value":"3","remark":"","sort":"3"},{"id":"39d81707-1fb0-b911-90ea-07b90d718a36","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"3","value":"4","remark":"","sort":"4"},{"id":"39d81707-1fb0-d6bc-2b8d-00633f7c01bb","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"4","value":"5","remark":"","sort":"5"},{"id":"39d81707-1fb0-bc17-889b-4968f829f40a","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"5","value":"6","remark":"","sort":"6"},{"id":"39d81707-1fb0-8149-55f2-43b37176ff39","indicator_id":"39d81707-1fb0-3b47-01b9-2618c8ccfee1","name":"5+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"最近来访距今日","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"7","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-2398-7178-7191-fe0c47c00678","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"3-","value":"1","remark":"","sort":"1"},{"id":"39d81707-2398-85a8-3c8c-cbc3f84247a6","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"4-7","value":"2","remark":"","sort":"2"},{"id":"39d81707-2398-619f-a943-844f5343b4bf","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"8-14","value":"3","remark":"","sort":"3"},{"id":"39d81707-2398-39ab-329c-6327468b5f1f","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"15-21","value":"4","remark":"","sort":"4"},{"id":"39d81707-2398-1c29-0c19-118dfac5c597","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"22-28","value":"5","remark":"","sort":"5"},{"id":"39d81707-2398-cc2b-65ec-b93a09248fb0","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"29-90","value":"6","remark":"","sort":"6"},{"id":"39d81707-2398-51b9-6661-a7912a22cd57","indicator_id":"39d81707-2398-a08f-7d29-dfa970f4b1cd","name":"90+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"来访总次数","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"8","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-2780-3b62-02d4-39adcba7b7a2","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"0","value":"1","remark":"","sort":"1"},{"id":"39d81707-2780-5a94-23fa-c5bf1c2d0ef5","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"1","value":"2","remark":"","sort":"2"},{"id":"39d81707-2780-3581-47e8-5536a96912d2","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"2","value":"3","remark":"","sort":"3"},{"id":"39d81707-2780-a0a6-9387-3e436e9c6191","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"3","value":"4","remark":"","sort":"4"},{"id":"39d81707-2780-edb7-8c91-19f8276eaf4f","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"4","value":"5","remark":"","sort":"5"},{"id":"39d81707-2780-25c0-3715-bf23d29b37e8","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"5","value":"6","remark":"","sort":"6"},{"id":"39d81707-2780-3e54-ee55-07b7a4ae0d6d","indicator_id":"39d81707-2398-b662-0f10-1c15d9c89c9e","name":"5+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"最近交易距近日","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"9","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-2780-fc31-4969-271646910356","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"3-","value":"1","remark":"","sort":"1"},{"id":"39d81707-2780-78b3-6a69-f9679e3a1d58","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"4-7","value":"2","remark":"","sort":"2"},{"id":"39d81707-2780-12cf-c887-3f7e729f67a1","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"8-14","value":"3","remark":"","sort":"3"},{"id":"39d81707-2780-0217-4536-e8312d0064ad","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"15-21","value":"4","remark":"","sort":"4"},{"id":"39d81707-2780-873e-7e83-0c2faeb5ee13","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"22-28","value":"5","remark":"","sort":"5"},{"id":"39d81707-2780-01a6-8c8d-f997fc6ff408","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"29-90","value":"6","remark":"","sort":"6"},{"id":"39d81707-2780-1328-aee4-0d440927441d","indicator_id":"39d81707-2780-594f-7d2b-634f96ba8273","name":"90+","value":"7","remark":"","sort":"7"}]},{"id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"交易总次数","category_id":"39d8a6ec-06ef-adb7-75ab-eb229dfa97e6","remark":null,"sort":"10","default_show_analysis":"0","source":"ERP","values":[{"id":"39d81707-2780-17a3-7ff2-6d4690d6c2ce","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"0","value":"1","remark":"","sort":"1"},{"id":"39d81707-2780-7147-fdca-4c8a07cce718","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"1","value":"2","remark":"","sort":"2"},{"id":"39d81707-2780-9dca-7b8d-2733dfb1a4c9","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"2","value":"3","remark":"","sort":"3"},{"id":"39d81707-2780-dd13-68cc-d44dcce857a5","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"3","value":"4","remark":"","sort":"4"},{"id":"39d81707-2780-201a-80c5-a97d29093a1e","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"4","value":"5","remark":"","sort":"5"},{"id":"39d81707-2780-ada1-d716-2e6c036be856","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"5","value":"6","remark":"","sort":"6"},{"id":"39d81707-2780-79dc-d410-5ee3b5d9b358","indicator_id":"39d81707-2780-5955-1bbc-19243af39c5b","name":"5+","value":"7","remark":"","sort":"7"}]}]}]}
});

apiRouter.post('/360image/list', function *(next) {
	this.body = {"result":true,"msg":"","data":{"items":[{"id":"8ea8ed43-a0a8-4a17-8c7f-969aa4db242e","cst_name":"张*","gender":"女","ages":"不确定","mobile_tel":"13534******"},{"id":"3048b06d-4e03-466a-b1ce-748670291947","cst_name":"张**","gender":"女","ages":"不确定","mobile_tel":"15013******"},{"id":"7acfd1d5-7585-48fc-b61f-3962870b8c6b","cst_name":"梁*","gender":"男","ages":"不确定","mobile_tel":"13798******"},{"id":"6f9d075f-ec7a-4a7c-a4f9-d5bd0fabc0b9","cst_name":"谭**","gender":"男","ages":"不确定","mobile_tel":"13507******"},{"id":"d5685634-6e73-4734-933a-641aeb8126d7","cst_name":"邹*","gender":"女","ages":"不确定","mobile_tel":"13923******"},{"id":"55924f79-bc28-4343-9197-ae0213b3130a","cst_name":"韩**","gender":"女","ages":"不确定","mobile_tel":"15521******"},{"id":"181515ba-0241-4f5f-971e-fb97eb96ae92","cst_name":"喻*","gender":"女","ages":"不确定","mobile_tel":"18023******"},{"id":"82a2686b-a795-4b83-94aa-a17f51570965","cst_name":"田*","gender":"女","ages":"不确定","mobile_tel":"13005******"},{"id":"0c43ccae-3cc5-4203-8a3f-2a5394e79993","cst_name":"杨**","gender":"男","ages":"不确定","mobile_tel":"13760******"},{"id":"f1c5fa9e-2744-43fb-b5cd-266ca993ba4c","cst_name":"王*","gender":"男","ages":"不确定","mobile_tel":"13746******"}],"total":78}}
});

apiRouter.get('/360image/title-tags', function *(next) {
	this.body = {"result":true,"msg":"","data":{"title":"张**","tag":[]}}
});

apiRouter.get('/360image/sections', function *(next) {
	this.body = {"result":true,"msg":"","data":[{"id":"39d8d0de-27df-3a1b-bc16-4a9957a51a92","type":"base","name":"基本信息","sort":"1"},{"id":"39d8d0de-81b7-7328-6d59-6b8d28b344f6","type":"table","name":"意向信息","sort":"2"},{"id":"39d8d474-cbbf-b202-e717-75940c2e6a80","type":"table","name":"交易信息","sort":"3"},{"id":"39d8d473-ae97-a522-cbbc-175c46a7b7a4","type":"table","name":"会员信息","sort":"4"},{"id":"39d8d0df-21df-8dd1-6313-3cb926c329ae","type":"time_zone","name":"行为信息","sort":"5"}]}
});

apiRouter.post('/360image/section-detail', function *(next) {
	const detail = {
		'39d8d0de-27df-3a1b-bc16-4a9957a51a92': {"result":true,"msg":"","data":[[{"key":"姓名","value":"张**"},{"key":"性别","value":"女"},{"key":"年龄","value":"--"},{"key":"手机","value":"13534******"},{"key":"生日","value":"*"},{"key":"微信号","value":"*"},{"key":"客户类型","value":"1"},{"key":"购房资格","value":"--"},{"key":"客户来源","value":"--"},{"key":"身份证号","value":"*"},{"key":"通信地址","value":"深圳**"}]]},
		'39d8d0de-81b7-7328-6d59-6b8d28b344f6': {"result":true,"msg":"","data":{"total":"1","data":[[{"key":"购房用途","value":"--"},{"key":"意向等级","value":"一般"},{"key":"意向户型","value":"两房"},{"key":"意向面积","value":"90到130平米"},{"key":"意向价格","value":"--"},{"key":"意向楼层","value":"--"},{"key":"意向期数","value":"--"},{"key":"关注方面1","value":"--"},{"key":"关注方面2","value":"--"},{"key":"关注方面3","value":"--"},{"key":"媒体大类","value":"报纸"},{"key":"媒体子类","value":"南方都市报"}]]}},
		'39d8d474-cbbf-b202-e717-75940c2e6a80': {"result":true,"msg":"","data":{"total":"0","data":[]}},
		'39d8d473-ae97-a522-cbbc-175c46a7b7a4': {"result":true,"msg":"","data":{"total":"0","data":[]}},
		'39d8d0df-21df-8dd1-6313-3cb926c329ae': {"result":true,"msg":"","data":[{"date":"2014-12-25","content":["去电,回访"]},{"date":"2013-04-02","content":["来电,"]},{"date":"2012-06-30","content":["来电,"]}]}
	};

	const { section_id } = this.request.body

	this.body = detail[ section_id ]
});

apiRouter.get('/tag/list', function *(next) {
	this.body = {"result":true,"msg":"","data":{"total":3,"items":[{"id":"39d81270-25b4-a217-40e9-cb21b12ef8ec","name":"可爱","type":"基础","indicator_id":"39d81270-25b4-c6d2-f5b7-3ec371c0a7c6","indicator_value_id":"39d81270-26b1-5f9d-362b-e63823873b8a","created_on":"2016-05-30 14:04:19","modified_on":"2016-05-30 16:12:59","status":"0","total_record":"0","indicator_name":"形容词"},{"id":"39d81270-f252-7f66-2364-26ade5adf3cf","name":"打架","type":"基础","indicator_id":"39d81270-f252-bba8-7d03-7f34f3143118","indicator_value_id":"39d81270-f346-313b-2389-c6fa85e9157d","created_on":"2016-05-30 14:05:11","modified_on":"2016-05-30 14:05:11","status":"0","total_record":"0","indicator_name":"动词"},{"id":"39d81272-abf2-47ed-7618-b1a12bd7e9cc","name":"美丽123","type":"基础","indicator_id":"39d81270-25b4-c6d2-f5b7-3ec371c0a7c6","indicator_value_id":"39d81272-ad27-fee1-967e-53740ae7909e","created_on":"2016-05-30 14:07:04","modified_on":"2016-05-31 15:32:26","status":"1","total_record":"0","indicator_name":"形容词"}],"extendField":null}}
});

apiRouter.post('/tag/delete', function *(next) {
	// const { id } = this.request.body

	this.body = {
		result: false,
		msg: '系统异常，无法删除数据，请稍候重试。',
		data: null
	}
});

apiRouter.post('/tag/save', function *(next) {
	const { id } = this.request.body

	if (id) {
		this.body = {
			result: true,
			msg: '',
			data: null
		}
	} else { // 新增时，返回错误信息
		this.body = {
			result: false,
			msg: '抱歉，新增失败，请稍候重试。',
			data: null
		}
	}
});

apiRouter.get('/tag/detail', function *(next) {
	this.body = {"result":true,"msg":"","data":{"id":"39d81270-25b4-a217-40e9-cb21b12ef8ec","name":"可爱","type":"基础","total_record":"0","indicators_data":[{"id":"39d812e5-f542-5f47-6ee9-df7f2c6d58fa","tag_id":"39d81270-25b4-a217-40e9-cb21b12ef8ec","indicator_id":"39d8a6ec-06ef-07a4-b1c0-36a80edcbbc3","sort":"1","name":"性别","col_name":"gender","values":[{"id":"39d812e5-f546-eeb5-b08c-f3eec8422c72","tag_indicator_id":"39d812e5-f542-5f47-6ee9-df7f2c6d58fa","indicator_value_id":"39d8a6ec-06ef-1455-f4b3-2b5ef8289af3","name":"男","value":"1"}]},{"id":"39d812e5-f54c-db27-8686-f2c3be4ed801","tag_id":"39d81270-25b4-a217-40e9-cb21b12ef8ec","indicator_id":"39d8a6ec-06ef-b33e-25d7-179b4858fac4","sort":"2","name":"年龄段","col_name":"ages","values":[{"id":"39d812e5-f551-ebe6-9d4b-2baeb2370b5f","tag_indicator_id":"39d812e5-f54c-db27-8686-f2c3be4ed801","indicator_value_id":"39d8a6ec-06ef-83cb-8ccd-6d718ca52177","name":"25岁以下","value":"1"}]}],"indicator":{"id":"39d81270-25b4-c6d2-f5b7-3ec371c0a7c6","name":"形容词"}}}
});

app.use(apiRouter.routes());

//==================================================


// let token = '', siteDir = 'static', indexHtml = __PROD__ ? `/${siteDir}/index` : `/${siteDir}/index-dev`;


/**
 * 页面路由，页面入口可能从passport进来，会带有租户代码，这里需要处理
 */
let router = new Router();

// router.all('/', function *() {
// 	this.redirect(`${token}/${siteDir}`);
// 	this.status = 302;
// });

// router.get(`${token}/${siteDir}`, function *() {
// 	yield this.render(indexHtml);
// });

// router.get(`${token}/${siteDir}/*`, function *() {
// 	yield this.render(indexHtml);
// });

// router.get('*', function *(next) {
// 	let urlKeys = this.request.path.split('/')
	
// 	if(urlKeys.length > 1 && urlKeys[2] === siteDir){
// 		token = '/' + urlKeys[1]
// 		yield this.render(indexHtml);
// 	}
// });

router.get('/', function *() {
	yield this.render('index');
});

router.get('*', function *(next) {
	yield this.render('index');
});

app.use(router.routes());



app.listen(config.serverPort, config.serverHostName, function(){
	console.log('Listening at http://localhost:' + config.serverPort);
});
