/**
 * MockController
 *
 * @description :: Server-side logic for managing mocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
            parameters: {
                seller_code:'123'
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
        var mockid = req.param('mockid');
        console.log(mockid)
        Mock.findOne({
            _id: MongodbService.newObjectId(mockid)
        }).exec(function(err, data) {
            if (err||!data) {
                res.send(500, { error: err});
            } else {
                data.path='/response';
                //var swagger = {"swagger":"2.0","info":{"version":"1.0.0","title":"Swagger Petstore"},"host":"mock.example.com","basePath":"/","paths":{"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","examples":{"application/json":{"result":true,"msg":"登录成功","data":{"username":"yulingchen"}}}}}}}}}
                var swagger = SwaggerService.convertMockToSwaggerObj(data);
                console.log(JSON.stringify(swagger))
                MockService.responseMockData(swagger,req, res);
            }
        });
    }

};

