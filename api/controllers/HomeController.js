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
            title: 'test',
            author: 'mysoft',
            body: 'hello, welcome',
            hidden: false
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
        }).sort('_id').limit(2).exec(function(err, data) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(data);
            }
        });
    }
};
