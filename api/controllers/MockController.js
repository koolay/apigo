/**
 * MockController
 *
 * @description :: Server-side logic for managing mocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
var request = require('request');

function _isAllHeadersExist(mockheaders, requestheaders){
    for(var header in mockheaders){
        if(mockheaders.hasOwnProperty(header)){
            var flag = requestheaders[header.toLowerCase()]
            console.log('flag:'+flag)
            console.log('header:'+header)
            if(!flag){
                return false;
            }
        }
    }
    return true;
}

function _findMock(mocklist,request){
    var foundMock;
    for(var i=0; i<mocklist.length; i++){
        var mock = mocklist[i];

        //对比method
        console.log('mock.method:'+mock.method)
        console.log('request.method:'+request.method)
        if(mock.method.toLowerCase() != request.method){
            continue;
        }

        //对比query
        console.log('mock.query:'+JSON.stringify(mock.query))
        console.log('request.query:'+JSON.stringify(request.query))
        if(mock.query&&!_.isEqual(mock.query, request.query)){
            continue;
        }

        //对比body
        console.log('mock.body:'+JSON.stringify(mock.body))
        console.log('request.body:'+JSON.stringify(request.body))
        if(mock.body&&!_.isEqual(mock.body, request.body)){
            continue;
        }

        //对比headers（暂时关闭校验)
        // console.log('mock.headers:'+JSON.stringify(mock.headers))
        // console.log('request.headers:'+JSON.stringify(request.headers))
        // if(mock.headers){
        //     if(!_isAllHeadersExist(mock.headers, request.headers)){
        //         continue;
        //     }
        // }

        foundMock = mock;
        break;
    }
    return foundMock;
}

module.exports = {

    create: function(req, res) {
        var paramsInput = req.param('params_input');
        var headersInput = req.param('headers_input');

        //创建接口
        var mock = new Mock({
            pathId:'577536e6209f0e8524003c43',
            summary:'查询用户列表',
            description:'模拟查看用户列表请求',
            method:'get',
            consumes:'application/json',
            produces:'application/json',
            query: {
                seller_code:'999'
            },
            // body:{
            //     token:'789'
            // },
            headers:{
                "Content-Type": 'application/json'
            },
            httpCode: 200,
            responses: {
                data: [
                    {
                        name: 'yulingchen',
                        age: 18
                    },
                    {
                        name: 'huwailai',
                        age: 20
                    }
                ]
            }
        });

        var error = mock.validateSync();
        if (error) {
            return res.json({
                result: false,
                error: error
            });
        }
        mock.save(function(err, mock) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(mock);
            };
        });
    },

    update: function(req, res) {

    },

    remove: function(req, res){
        var mockid = req.param('mockid');
        Mock.remove({_id: MongodbService.newObjectId(mockid)},function(err){
            return res.json({
                result: err ? false : true,
                msg: err ? err : '删除成功'
            });
        });
    },

    list: function(req, res) {
        Mock.find({
            pathId: req.param('pathid')
        }).select({}).sort('-_id').exec(function(err, data) {
            if (err) {
                return res.negotiate({
                    result:false,
                    msg:err
                });
            } else {
                return res.json({
                    result: true,
                    data: data
                });
            }
        });
    },

    /**
     * `mock view`
     */
    view: function (req, res) {
        //输入数据
        var request = {
            method: req.method.toLowerCase(),
            query: req.query,
            body: req.body,
            headers: req.headers
        }

        console.log('request:'+JSON.stringify(request))

        //比较
        var pathname = req.params.pathname;
        console.log('pathname:'+req.param('pathname'));
        console.log('pathname:'+pathname);
        Path.findOne({name: pathname}).exec(function(err, data) {
            if(err){
                res.send(500, { error: err});
            }

            console.log('find path:'+data)

            var pathid = data._id;
            console.log('pathid:'+pathid);

            Mock.find({pathId: pathid}).sort('-_id').exec(function(err, data) {
                if(err){
                    res.send(500, { error: err});
                }

                var mocklist = data;
                console.log('mocklist:'+JSON.stringify(data));

                var findMock = _findMock(mocklist,request);
                if(findMock){
                    console.log(JSON.stringify(findMock))
                    findMock.path='/response';
                    //var swagger = {"swagger":"2.0","info":{"version":"1.0.0","title":"Swagger Petstore"},"host":"mock.example.com","basePath":"/","paths":{"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","examples":{"application/json":{"result":true,"msg":"登录成功","data":{"username":"yulingchen"}}}}}}}}}
                    var swagger = SwaggerService.convertMockToSwaggerObj(findMock);
                    console.log(JSON.stringify(swagger))
                    MockService.responseMockData(swagger,req, res);
                }else{
                    res.send(200, '没有找到匹配的模拟用例');
                }
            });
        })
    },

    test: function(req, res){
        request({
            uri: 'http://127.0.0.1:1337/mock/cic_market_api_pay_create?seller_code=123',
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify({
                token: '789'
            })
        },function (error, response, body){
            console.log(body)
        })
    }

};

