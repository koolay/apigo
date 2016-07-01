/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports = {

    swagger: function(req, res) {

        var projectId = req.param('id') ? req.param('id') : '57729f9d5df150cc0ab98825';
        if (!MongodbService.isObjectId(projectId)) {
            return res.status(404).json({
                result: false,
                msg: 'not found'
            });
        }
        var query = async(function(projectId) {
            var project = await(Project.findOne({
                '_id': MongodbService.newObjectId(projectId)
            }).exec());
            if (!project) {
                return res.json({
                    result: false,
                    msg: 'not found.' + projectId
                });
            }
            var paths = await(Path.find({
                projectId: projectId
            }).exec());

            return SwaggerService.convertPathToSwaggerObj(project, paths);

        });

        query(projectId).then(function(data) {
            return res.json(data);

        });

    },

    create: function(req, res) {

        var project = new Project({
            name: 'market',
            info: {
                description: '2B商城',
                version: '1.0.0',
                title: '2B商城',
            },
            host: 'market.mypaas.com.cn',
            basePath: '/',
            schemes: ['http', 'https'],
            paths: [],
        });
        project.save(function(err, project) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(project);
            }

        });

    }

};
