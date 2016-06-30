/**
 * sub schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    schema: {
        name: {
            type: String,
            required: true
        },
        description: String,
    },

    constructSchema: function(schemaDefinedAbove, sails) {
        // e.g. we might want to pass in a second argument to the schema constructor
        var mySchema = new sails.mongoose.Schema(schemaDefinedAbove, {
            _id: false
        });

        return mySchema;
    }
}
