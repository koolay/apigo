/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res) {
        //return res.json({result: true});
        return res.view('index');
    },
    create: function(req, res) {
            //projectId: MongodbService.newObjectId(sails.config.projectId),
        var api = new Project({
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

};
