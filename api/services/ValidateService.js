"use strict";

/**
 *
 */

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var Ajv = require('ajv');
var mongoose = require('mongoose');

var ajv = Ajv({
    allErrors: true
});
ajv.addKeyword('ObjectId', {
    type: 'string',
    compile: function(id) {
        if (!id) {
            return false;
        }
        return mongoose.Types.ObjectId.isValid(id + '');
    }
});

module.exports = {
    isEmpty: function(obj) {
        return !Object.keys(obj).length;
    },
    validSchema: function(schema) {
        return ajv.compile(schema)

    }


}
