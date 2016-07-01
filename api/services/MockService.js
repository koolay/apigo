/**
 * Mockserver Service
 */
var yaml = require('yamljs');
var apish = require('apish');
var httpProxy = require('http-proxy');

module.exports = {

  /**
   * return swagger response
   *
   * 参数：
   * swagger                  - 测试用例swagger数据
   * req, res                 - proxyed http
   */
  responseMockData: function(swagger, req, res){
    var host='mock.example.com';
    var path='';
    for(var path in swagger.paths){
    	if(!path){
    		path = path;
    	}
    }

    var swagger_yaml = yaml.stringify(swagger, 4);
    var mockedApi = apish(swagger_yaml,{
      host:'http://'+host
    });

    res.set('Content-Type', 'application/json;charset=utf-8');
    mockedApi.then(function(result){
      var proxy = httpProxy.createProxyServer({}); 
      proxy.web(req, res, { target: {
        host: host,
        port: 80,
        path: path
      },ignorePath:true});

      proxy.on('proxyRes', function (proxyRes, req, res) {
      	mockedApi.value().restore();
			});

      proxy.on('error', function(e) {
      	mockedApi.value().restore();
        console.log(e.message);
        res.send(500, { error: e.message});
      });

    }).catch(function(error){
      console.log(error)
      res.send(500, { error: error});
    })
  }
};

