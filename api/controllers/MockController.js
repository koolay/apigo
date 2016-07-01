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
        Mock.find({}).select({
            _id: 0
        }).sort('-_id').exec(function(err, data) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(data);
            }
        });
    },

    go: function(req, res) {

    }

};

