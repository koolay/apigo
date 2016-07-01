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

        var post = req.body;

        //base
        var projectId = post.projectId || PROJECT_ID;
        var tag = post.tag || '商城支付';

        //接口id.[a-zA-Z\.\-_]+
        var name = post.name;
        //eg: GET\POST\PUT\ etc.
        var method = post.request.method.toLowerCase();
        //接口名称
        var summary = post.summary;
        //接口描述
        var description = post.description;
        var apiPath = post.path;
        var contentTypeInput = post.request.contentType;

        //input
        var paramsInput = post.request.params;
        var queryInput = post.request.query;

        //获取输入参数
        var paramsInputToSave = [];
        if (paramsInput) {
            if (!_.isObject(paramsInput)) {
                return ResponseService.toJson(res, true, '', 'params格式不正确');
            }

            Object.keys(paramsInput).forEach(function(key) {
                var item = paramsInput[key];
                paramsInputToSave.push({
                    name: key,
                    in : 'formData',
                    description: item.description,
                    required: item.required,
                    type: item.type
                });

            });

        }
        if (queryInput) {
            if (!_.isObject(queryInput)) {
                return ResponseService.toJson(res, true, '', 'query格式不正确');
            }

            Object.keys(queryInput).forEach(function(key) {
                var item = queryInput[key];
                paramsInputToSave.push({
                    name: key,
                    in : 'query',
                    description: item.description,
                    required: item.required,
                    type: item.type
                });

            });

        }

        //获取输入headers
        var headersInput = post.request.headers;

        for (var i = 0; i < headersInput.length; i++) {
            var item = headersInput[i];
            paramsInputToSave.push({
                name: item.key,
                in : 'header',
                description: item.description,
            });
        }

        //output
        //[{httpCode: 200, description:'', contentType:'application/json', schema: {}, headers: [] }]
        var responses = post.responses;

        /******** convert db ************/
        var responseToSave = [];
        var producesToSave = [];
        for (var i = 0; i < responses.length; i++) {

            var rep = responses[i];
            var dbResponse = {
                httpCode: rep.httpCode,
            };
            if (rep.description) {
                dbResponse['description'] = rep.description;
            }
            if (rep.schema) {
                dbResponse['dataSchema'] = rep.schema;
            }
            if (rep.headers) {
                dbResponse['headers'] = [];
                for (var i = 0; i < rep.headers.length; i++) {
                    var item = rep.headers[i];
                    producesToSave.push(rep.contentType);
                    dbResponse['headers'].push({
                        name: item.key,
                        type: 'string',
                        description: item.description
                    });

                }
            }
            responseToSave.push(dbResponse);

        }

        //创建接口
        var path = new Path({
            projectId: PROJECT_ID,
            name: name,
            tag: tag,
            method: method,
            summary: summary,
            path: apiPath,
            description: description,
            operationId: '',
            consumes: [contentTypeInput],
            produces: producesToSave,
            deprecated: false,
            parameters: paramsInputToSave,
            responses: responseToSave

        });

        /********************** demo *****************/

        //var response200 = {
        //httpCode: 200,
        //description: '正常返回',
        //dataSchema: {
        //type: 'object',
        //properties: {
        //errcode: {
        //type: 'integer',
        //description: '错误码,等于0表示正常'
        //},
        //errmsg: {
        //type: 'string',
        //description: '提示信息'
        //},
        //data: {
        //type: 'object',
        //properties: {
        //timestamp: {
        //type: 'integer',
        //description: '时间'
        //},
        //prepare_id: {
        //type: 'string',
        //description: '预支付id'
        //},
        //mch_id: {
        //type: 'string',
        //description: '商户号'
        //}
        //}
        //}

        //}
        //},
        //headers: [{
        //name: 'X-Rate-Limit-Limit',
        //type: 'integer',
        //description: 'The number of allowed requests in the current period'
        //}, {
        //name: 'X-Rate-Limit-Remaining',
        //type: 'integer',
        //description: 'The number of remaining requests in the current period'
        //}]
        //};

        //var response401 = {
        //httpCode: 401,
        //description: '没有授权',
        //};

        ////创建接口
        //var path = new Path({
        //projectId: PROJECT_ID,
        //name: 'cic.market.api.pay.create',
        //tag: '支付模块',
        //method: 'post',
        //summary: '创建待支付订单',
        //path: '/api/pay/create',
        //description: '创建待支付订单,发起微信支付前调用',
        //operationId: '',
        //consumes: ['multipart/form-data'],
        //produces: ['application/json'],
        //deprecated: false,
        //parameters: [{
        //name: 'seller_code',
        //in : 'formData',
        //description: '商家代码',
        //required: true,
        //type: 'string'
        //}, {

        //name: 'total_fee',
        //in : 'formData',
        //description: '总费用,保留2位小数',
        //required: true,
        //type: 'number'
        //}],
        //responses: [response200, response401]

        //});

        var error = path.validateSync();
        if (error) {
            return ResponseService.toJson(res, false, error, '输入格式不正确');
        }
        path.save(function(err, api) {
            if (err) {
                return res.negotiate(err);
            } else {
                return ResponseService.toJson(res, true, api);
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
                return res.negotiate({
                    result: false,
                    msg: err
                });
            } else {
                return ResponseService.toJson(res, true, path);
            }

        })

    },

    swagger: function(req, res) {
        var id = req.param('id');
        Path.findOne({
            _id: id
        }).exec(function(err, path) {
            if (err) {
                return res.negotiate(err);
            } else {
                Project.findOne({
                    _id: path.projectId
                }).exec(function(err, project) {
                    var data = SwaggerService.convertPathToSwaggerObj(project, [path]);
                    return ResponseService.toJson(res, true, data);

                });
            }

        });

    },


    list: function(req, res) {
        var name = req.param('name');
        //var summary = req.param('summary');
        var tag = req.param('tag');
        var query = {};
        if (name) {
            query['name'] = name;
        }
        if (tag) {
            query['tag'] = tag;
        }

        Path.find(query).exec(function(err, data) {
            if (err) {
                return res.negotiate(err);
            } else {
                return ResponseService.toJson(res, true, data);
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
