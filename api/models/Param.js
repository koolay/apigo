/**
 * sub schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeEnum = ['string', 'integer', 'boolean', 'array'];

module.exports = {
    name: {
        type: String,
        required: true,
    },
    in : {
        type: String,
        enum: ['body', 'path', 'query'],
        required: true,
        default: 'body'
    },
    description: String,
    required: {
        type: Boolean,
        required: true,
        default: true
    },
    type: {
        type: String,
        required: true,
        enum: typeEnum,
        default: 'string'
    },

    constructSchema: function(schemaDefinedAbove, sails) {
        // e.g. we might want to pass in a second argument to the schema constructor
        var mySchema = new sails.mongoose.Schema(schemaDefinedAbove, {
            _id: false
        });

        return mySchema;
    }
}
