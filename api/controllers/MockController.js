/**
 * MockController
 *
 * @description :: Server-side logic for managing mocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
var request = require('request');

function _isAllHeadersExist(mockheaders, requestheaders) {
    for (var header in mockheaders) {
        if (mockheaders.hasOwnProperty(header)) {
            var flag = requestheaders[header.toLowerCase()]
            console.log('flag:' + flag)
            console.log('header:' + header)
            if (!flag) {
                return false;
            }
        }
    }
    return true;
}

function _customizer(objValue, othValue){
    if(typeof objValue == 'number' && +objValue==othValue) return true;
    if(typeof objValue == 'boolean' && objValue.toString()==othValue) return true;
    if(objValue === null  && ""+objValue==othValue) return true;
}

function _findMock(mocklist, request) {
    var foundMock;
    for (var i = 0; i < mocklist.length; i++) {
        var mock = mocklist[i];

        //对比method
        if (mock.method.toLowerCase() != request.method) {
            continue;
        }

        //对比query
        console.log('request query:'+JSON.stringify(request.query))
        console.log('mock query:'+JSON.stringify(mock.query))
        if (request.query && Object.keys(request.query).length>0 && !_.isEqualWith(mock.query, request.query, _customizer)) {
            console.log('query is not equal')
            continue;
        }

        //对比body
        console.log('request body:'+JSON.stringify(request.body))
        console.log('mock body:'+JSON.stringify(mock.body))
        if (request.body && Object.keys(request.body).length>0 && !_.isEqualWith(mock.body, request.body, _customizer)) {
            console.log('body is not equal')
            continue;
        }

        //对比headers
        // if(request.headers){
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

        var post = req.body;
        //input
        var paramsInput = post.request.params;

        //创建接口

        var obj = {
            pathId: post.pathId,
            summary: post.summary,
            description: post.description,
            method: post.request.method.toLowerCase(),
            consumes: post.request.contentType,
            produces: 'application/json',
            body: post.request.params || {},
            query: post.request.querys || {},
        };

        if (post.responses) {
            var rep = post.responses[0];
            obj['httpCode'] = rep.httpCode;
            obj['responses'] = rep.data;

            if (rep.headers) {
                obj['headers'] = {};
                for (var i = 0; i < rep.headers.length; i++) {
                    var item = rep.headers[i];
                    obj['headers'][item.key] = item.description;
                }
            }
        }

        var mock = new Mock(obj);
        var error = mock.validateSync();
        if (error) {
            return ResponseService.toJson(res, false, error, '输入格式不正确');
        }
        mock.save(function(err, mock) {
            if (err) {
                return res.negotiate(err);
            } else {
                return ResponseService.toJson(res, true, mock);
            };
        });
    },

    remove: function(req, res) {
        var mockid = req.param('mockid');
        Mock.remove({
            _id: MongodbService.newObjectId(mockid)
        }, function(err) {
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
                    result: false,
                    msg: err
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
    view: function(req, res) {
        //输入数据
        var request = {
            method: req.method.toLowerCase(),
            query: req.query,
            body: req.body,
            headers: req.headers
        }

        console.log('request:' + JSON.stringify(request))

        //比较
        var pathname = req.params.pathname;
        console.log('pathname:' + req.param('pathname'));
        console.log('pathname:' + pathname);
        Path.findOne({
            name: pathname
        }).exec(function(err, data) {
            if (err) {
                res.send(500, {
                    error: err
                });
            }

            console.log('find path:' + data)

            var pathid = data._id;
            console.log('pathid:' + pathid);

            Mock.find({
                pathId: pathid
            }).sort('-_id').exec(function(err, data) {
                if (err) {
                    res.send(500, {
                        error: err
                    });
                }

                var mocklist = data;
                console.log('mocklist:' + JSON.stringify(data));

                var findMock = _findMock(mocklist, request);
                if (findMock) {
                    console.log(JSON.stringify(findMock))
                    findMock.path = '/response';
                    //var swagger = {"swagger":"2.0","info":{"version":"1.0.0","title":"Swagger Petstore"},"host":"mock.example.com","basePath":"/","paths":{"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","examples":{"application/json":{"result":true,"msg":"登录成功","data":{"username":"yulingchen"}}}}}}}}}
                    var swagger = SwaggerService.convertMockToSwaggerObj(findMock);
                    console.log(JSON.stringify(swagger))
                    MockService.responseMockData(swagger, req, res);
                } else {
                    res.send(200, '没有找到匹配的模拟用例');
                }
                console.log('mocklist:' + data);



            });
        })
    },

    test: function(req, res) {
        request({
            uri: 'http://127.0.0.1:1337/mock/cic_market_api_pay_create?seller_code=123',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                token: '789'
            })
        }, function(error, response, body) {
            console.log(body)
        })
    }

};
