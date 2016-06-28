/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
