/**
 * Path.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * http://petstore.swagger.io/v2/swagger.json
 */
var mongoose = require('mongoose');
var methodEnum = ['get', 'post', 'put', 'fetch'];
var typeEnum = ['string', 'integer', 'boolean', 'array', 'file', 'number', 'object'];
var paramInEnum = ['body', 'path', 'query', 'header', 'formData'];
var Schema = mongoose.Schema;

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
        _id: false,
        type: {
            type: String,
            enum: typeEnum,
        },
        //when array then items:{}, when object then  properties:{},
        properties: {}

    },
    headers:[{
        _id: false,
        name: String,
        type: {
            type: String,
            enum: typeEnum
        },
        description: String,
        format: String
    }],
    default: {
        description: String
    },
}, {
    _id: false
});
module.exports = {

    schema: {
        projectId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            match: /^[a-zA-Z]+[a-zA-Z_\-]*/
        },
        method: {
            type: String,
            enum: methodEnum,
            required: true
        },
        //所属项目模块
        tag: String,
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
        parameters: [{
            _id: false,
            name: {
                type: String,
                required: true,
            },
            in : {
                type: String,
                enum: paramInEnum,
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
            format: String
        }],
        responses: [responseSubSchema],
        deprecated: {
            type: Boolean,
            required: true,
            default: false
        }

    },

    constructSchema: function(schemaDefinedAbove, sails) {
        var mySchema = new sails.mongoose.Schema(schemaDefinedAbove);
        mySchema.index({
            name: 1,
        }, {
            unique: true
        });

        return mySchema;
    },
}
