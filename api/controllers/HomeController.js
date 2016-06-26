/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res) {
        return res.view('index');
    },
    create: function(req, res) {
        var api = new Apis({
            projectId: MongodbService.newObjectId(sails.config.projectId),
            version: '0.1.0',
            summary: 'get user list',
            description: 'get user list, paging',
            method: 'GET',
            path: '/user/list',
            headers: [{name: 'token', required: false, description: 'token for login'}],
            parameters: [{name: 'id', required: true, description: 'id of user', format:'int'}],
            response: {
                description: 'result return',
                httpCode: 200,
                data: [{name: 'result', description: 'it is true or false', format:'bool'},
                    {name: 'msg', description: 'message of return', length: 50},
                    {name: 'data', description: 'the data of return', format: 'json'}
                ]
            }
        });

        var error = api.validateSync();
        if (error) {
            return res.json({
                result: false,
                error: error
            });
        }
        api.save(function(err, api) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(api);
            };
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

};
