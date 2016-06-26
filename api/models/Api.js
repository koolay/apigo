/**
 * Api.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subKeyValue = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    format: {
        type: String,
        enum: ['string', 'bool', 'int', 'array', 'object', 'float'],
        default: 'string'
    },
    length: Number,
    required: {
        type: Boolean,
        required: true
    }
}, {
    _id: false
});
var responseField = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    format: {
        type: String,
        enum: ['string', 'bool', 'int', 'array', 'object', 'float'],
        default: 'string'
    },
    length: Number
}, {
    _id: false
});

module.exports = {

    schema: {
        projectId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: new mongoose.mongo.ObjectID('56cb91bdc3464f14678934ca')
        },
        version: String,
        name: {
            type: String,
            required: true,
            minlength: 3,
            match: /^[a-zA-Z]+[a-zA-Z\._]*[a-zA-Z]$/,
        },
        summary: {
            type: String,
            required: true
        },
        description: String,
        method: {
            type: String,
            required: true,
            enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
        }, //GET/POST/PUT/
        path: {
            type: String,
            required: true,
            match: /^(\/\w+)+/
        },
        headers: [subKeyValue],
        parameters: [subKeyValue],
        response: {
            httpCode: {
                type: Number,
                required: true,
                min: 200
            },
            contentType: {
                type: String,
                required: true,
                match: /^application\/\w+/,
                default: 'application/json'
            },
            description: String,
            data: {
                type: Schema.Types.Mixed
            }

        }
    },

    /**
     * constructSchema()
     *
     * Note that this function must be synchronous!
     *
     * @param  {Dictionary} schemaDefinedAbove  [the raw schema defined above, or `{}` if no schema was provided]
     * @param  {SailsApp} sails                 [just in case you have globals disabled, this way you always have access to `sails`]
     * @return {MongooseSchema}
     */
    constructSchema: function(schemaDefinedAbove, sails) {
        // e.g. we might want to pass in a second argument to the schema constructor
        var mySchema = new sails.mongoose.Schema(schemaDefinedAbove);
        mySchema.index({
            name: 1,
            version: 1
        }, {
            unique: true
        });
        //// Or we might want to define an instance method:
        //newSchema.method('meow', function () {
        //console.log('meeeeeoooooooooooow');
        //});

        //// Or a static ("class") method:
        //newSchema.static('findByName', function (name, callback) {
        //return this.find({ name: name }, callback);
        //});

        return mySchema;
    }

};
