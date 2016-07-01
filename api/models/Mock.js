/**
 * Mock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var methodEnum = ['get', 'post', 'put', 'fetch'];

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
        responses: {},
    }

};

