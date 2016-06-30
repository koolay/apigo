'use strict';

/**
 * SchemaError representes a schema error.
 *
 * @public
 * @class
 */
module.exports = class SchemaError extends Error {
    /**
     * Constructor of SchemaError.
     *
     * @public
     * @constructor
     * @param {String} message - Description of the error.
     */
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'SchemaError';
        this.code = 'SCHEMA_ERROR';
    }
};

