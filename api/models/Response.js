/**
 * sub schema
 */

var mongoose = require('mongoose');
var typeEnum = ['string', 'integer', 'boolean', 'array'];
var Schema = mongoose.Schema;
var propertySubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: typeEnum,
        default: 'string'
    },
    description: String
}, {
    _id: false
});

module.exports = {
    schema: {
        httpCode: {
            type: Number,
            min: 200,
            required: true,
            default: 200
        },
        description: String,
        //实际是schema,
        dataSchema: {
            type: {
                type: String,
                required: true,
                default: 'object'
            },
            properties: [propertySubSchema]

        },
        default: {
            description: String
        },
    },

}
