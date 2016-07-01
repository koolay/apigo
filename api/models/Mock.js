/**
 * Mock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var methodEnum = ['get', 'post', 'put', 'fetch'];
var paramInEnum = ['body', 'path', 'query', 'header', 'formData'];
var typeEnum = ['string', 'integer', 'boolean', 'array', 'file', 'number', 'object'];

var responseSubSchema = new Schema({

    httpCode: {
        type: Number,
        min: 200,
        required: true,
        default: 200
    },
    //实际是schema,
    response: {},
    headers:[{
        _id: false,
        name: String,
        type: {
            type: String,
            enum: typeEnum
        },
        description: String,
        format: String
    }]
}, {
    _id: false
});

module.exports = {
    schema: {
        pathId:{
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        method: {
            type: String,
            enum: methodEnum,
            required: true
        },
        consumes: {
            type: [String],
            default: ['multipart/json']
        },
        produces: {
            type: [String],
            default: ['application/json']
        },
        headers:{},
        parameters: {},
        responses: [responseSubSchema],
    }

};

