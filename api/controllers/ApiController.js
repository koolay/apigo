/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nock = require('nock');

module.exports = {

    create: function(req, res) {

        var response200 = {
            httpCode: 200,
            description: '正常返回',
            dataSchema: {
                type: 'object',
                properties: [{
                    name: 'errcode',
                    type: 'integer',
                    description: '错误码,等于0表示正常'
                }, {
                    name: 'errmsg',
                    type: 'string',
                    description: '提示信息'
                }, {
                    name: 'data',
                    type: 'object',
                    properties: [{
                        name: 'timestamp',
                        type: 'integer',
                        description: '时间'
                    }, {
                        name: 'prepare_id',
                        type: 'string',
                        description: '预支付id'
                    }, {
                        name: 'mch_id',
                        type: 'string',
                        description: '商户号'
                    }]
                }]
            }
        };

        var response401 = {
            httpCode: 401,
            description: '没有授权',
            dataSchema: false,
        };

        //创建接口
        var path = new Path({
            projectId: '57729f9d5df150cc0ab98825',
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
                in : 'body',
                description: '商家代码',
                required: true,
                type: 'string'
            }, {

                name: 'total_fee',
                in : 'body',
                description: '总费用,保留2位小数',
                required: true,
                type: 'number'
            }],
            response: [response200, response401]

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
        return res.json({
            result: true
        });

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
