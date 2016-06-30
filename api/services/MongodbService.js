var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var mongoose = require('mongoose');

var MongodbService = {
    isObjectId: function(id) {
        if (!id) {
            return false;
        }
        return mongoose.Types.ObjectId.isValid(id + '');
    },
    newObjectId: function(idStr) {
        if(_.isString(idStr)) {
            return new mongoose.mongo.ObjectID(idStr);
        } else {
            throw new Error('invalid args');
        }
    }

};

module.exports = MongodbService;
