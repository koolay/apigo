/**
 * Path.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * http://petstore.swagger.io/v2/swagger.json
 */
var mongoose = require('mongoose');
var methodEnum = ['get', 'post', 'put', 'fetch'];
var typeEnum = ['string', 'integer', 'boolean', 'array'];
var Schema = mongoose.Schema;
/******* sub schema *************/
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

var responseSubSchema = new Schema({
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
}, {
    _id: false
});
module.exports = {

    schema: {
        method: {
            type: String,
            enum: methodEnum,
            required: true
        },
        summary: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
            match: /^(\/\w+)+/
        },
        description: {
            type: String,
            required: true
        },
        operationId: String,
        consumes: {
            type: [String],
            default: ['multipart/form-data']
        },
        produces: {
            type: [String],
            default: ['application/json']
        },
        response: [responseSubSchema],
        deprecated: {
            type: Boolean,
            required: true,
            default: false
        }

    },

}
