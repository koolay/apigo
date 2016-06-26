/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nock = require('nock');

module.exports = {

    create: function(req, res) {

    },

    update: function(req, res) {

    },

    detail: function(req, res) {
        return res.json({
            result: true
        });

    },

    list: function(req, res) {
        Apis.find({}).select({
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
        Apis.findOne({
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
