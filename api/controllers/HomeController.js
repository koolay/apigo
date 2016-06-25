/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
// With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
 *
 */
module.exports = {
    index: function(req, res) {
        return res.view('index');
    },
    create: function(req, res) {
        Apis.create({
            title: 'test',
            author: 'mysoft',
            body: 'hello, welcome',
            hidden: false
        }, function(err, api) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.json(api);
            }
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
