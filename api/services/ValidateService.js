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

    checkMockData: function(input) {

        var schema = {
            "properties": {
                "api_id": {
                    "type": "string"
                },
                "summary": {
                    "type": "string"
                },
                "content_type": {
                    "type": "string"
                },
                "headers": {
                    "type": "string"
                },
                "parameters": {
                    "type": "string"
                },
                "http_code": {
                    "type": "number",
                    "minimum": 200
                },
                "data": {
                    "type": "string"
                },
            },
            "required": ["api_id", "content_type"]
        };

        var valid = ajv.validate(schema, input);
        if (valid) {
            return true;
        } else {
            return ajv.errorsText(ajv.errors)
        }
    }


}
