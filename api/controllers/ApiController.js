/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nock = require('nock');
const PROJECT_ID = '57729f9d5df150cc0ab98825';

module.exports = {

    create: function(req, res) {

        //base
        var projectId = req.param('project_id') ? req.param('project_id') : PROJECT_ID;

        //接口id.[a-zA-Z\.\-_]+
        var name = req.param('name');
        //接口名称
        var summary = req.param('summary');
        //接口描述
        var description = req.param('description');
        var path = req.param('path');
        var contentTypeInput = req.param('content-type_input'); //multipart/form-data
        var contentTypeOutput = req.param('content-type_output');

        //input
        var paramsInput = req.param('params');
        var headersInput = req.param('headers_input');

        //output
        //[{http_code: 200, schema: {}, headers: {} }]
        var responses = req.param('responses');


        var response200 = {
            httpCode: 200,
            description: '正常返回',
            dataSchema: {
                type: 'object',
                properties: {
                    errcode: {
                        type: 'integer',
                        description: '错误码,等于0表示正常'
                    },
                    errmsg: {
                        type: 'string',
                        description: '提示信息'
                    },
                    data: {
                        type: 'object',
                        properties: {
                            timestamp: {
                                type: 'integer',
                                description: '时间'
                            },
                            prepare_id: {
                                type: 'string',
                                description: '预支付id'
                            },
                            mch_id: {
                                type: 'string',
                                description: '商户号'
                            }
                        }
                    }

                }
            },
            headers: [{
                name: 'X-Rate-Limit-Limit',
                type: 'integer',
                description: 'The number of allowed requests in the current period'
            }, {
                name: 'X-Rate-Limit-Remaining',
                type: 'integer',
                description: 'The number of remaining requests in the current period'
            }]
        };

        var response401 = {
            httpCode: 401,
            description: '没有授权',
        };

        //创建接口
        var path = new Path({
            projectId: PROJECT_ID,
            name: 'cic.market.api.pay.create',
            tag: '支付模块',
            method: 'post',
            summary: '创建待支付订单',
            path: '/api/pay/create',
            description: '创建待支付订单,发起微信支付前调用',
            operationId: '',
            consumes: ['multipart/form-data'],
            produces: ['application/json'],
            deprecated: false,
            parameters: [{
                name: 'seller_code',
                in : 'formData',
                description: '商家代码',
                required: true,
                type: 'string'
            }, {

                name: 'total_fee',
                in : 'formData',
                description: '总费用,保留2位小数',
                required: true,
                type: 'number'
            }],
            responses: [response200, response401]

        });

        var error = path.validateSync();
        if (error) {
            return res.json({
                result: false,
                error: error
            });
        }
        path.save(function(err, api) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(api);
            };
        });

    },

    update: function(req, res) {

    },

    detail: function(req, res) {

        var query = {};
        var pathId = req.param('id');
        if (pathId && MongodbService.isObjectId(pathId)) {
            query['_id'] = MongodbService.newObjectId(pathId);
        } else {
            var name = req.param('name');
            if (name) {
                query['name'] = name;
            }
        }
        sails.log.info(query);
        Path.findOne(query).exec(function(err, path) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(path);
            }

        })

    },

    list: function(req, res) {
        Project.find({}).select({
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
        //var projectId = req.param('project_id');
        var projectId = sails.config.projectId;
        var path = req.param('path');
        if (!path || !projectId || !MongodbService.isObjectId(projectId)) {
            return res.status(404).json({
                'errmsg': '参数无效'
            })
        }
        Project.findOne({
            projectId: MongodbService.newObjectId(projectId),
            path: path
        }, function(err, api) {
            if (err) {
                return res.negotiate(err);
            } else {
                if (api) {
                    return res.json(api);
                } else {
                    return res.status(404).json({
                        'errmsg': '接口不存在'
                    });

                }
            }
        });
    }

};
