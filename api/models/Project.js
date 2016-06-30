/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {

    schema: {
        name: {
            type: String,
            required: true,
            match: /[a-zA-Z_-]+/,
        },
        swagger: {
            type: String,
            required: true,
            default: "2.0"
        },
        info: {
            description: String,
            version: String,
            title: String,
            termsOfService: String,
            contact: {
                email: String
            },
            //license: {
                //name: String,
                //url: String
            //}
        },
        host: String,
        basePath: {
            type: String,
            required: true,
            default: '/',
        },
        //tags: [],
        schemes: {
            type: [String],
            required: true,
            default: ['http']
        },
        externalDocs: {
            description: String,
            url: String
        }
    },

    constructSchema: function(schemaDefinedAbove, sails) {
        // e.g. we might want to pass in a second argument to the schema constructor
        var mySchema = new sails.mongoose.Schema(schemaDefinedAbove);
        mySchema.index({
            name: 1,
        }, {
            unique: true
        });

        return mySchema;
    }
};
