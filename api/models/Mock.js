/**
 * Mock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {

    schema: {
        apiId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        summary: {
            type: String,
        },
        headers: String,
        parameters: String,
        response: {
            httpCode: {
                type: Number,
                required: true,
                default: 200,
                min: 200
            },
            contentType: {
                type: String,
                required: true,
                match: /^application\/\w+/,
                default: 'application/json'
            },
            data: String
        }
    },

};
