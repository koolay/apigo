'use strict';

/**
 * Checks whether JSON objects respect JSON schemata.
 *
 * @author Carlos Lozano Sánchez
 * @license MIT
 * @copyright 2015-2016 Carlos Lozano Sánchez
 *
 * @see {@link http://json-schema.org/} for further information about JSON schemata.
 *
 * @module
 */

const checkTypes = require('check-types');
const Ajv = require('ajv');
const deref = require('json-schema-deref-local');

const SchemaError = require('./schemas/SchemaError');

/**
 * Checks whether the object respects the schema.
 *
 * @public
 * @static
 * @function
 * @param {Object} schema - Schema that must be respected.
 * @param {Object} object - Object that will be checked.
 * @returns {Boolean} - true if the object respects the schema.
 * @throws a TypeError if the schema parameter is not a valid Schema object.
 * @throws a TypeError if the object parameter is not a valid object.
 * @throws a SchemaError if the object does not respect the schema.
 */
module.exports.check = function check(schema, object) {
    if (checkTypes.not.object(schema)) {
        //TODO: Improve the condition.
        throw new TypeError('The parameter schema must be a non-null object');
    }

    if (checkTypes.not.object(object)) {
        //TODO: Improve the condition.
        throw new TypeError('The parameter schema must be a non-null object');
    }

    const fullSchema = deref(schema);

    const validatorOptions = {
        format: 'full'
    };
    const validator = new Ajv(validatorOptions);
    const regExpr = require('./MicrorestRegExpr');
    validator.addFormat('name', regExpr.name);
    validator.addFormat('version', regExpr.version);
    validator.addFormat('full-date', regExpr.fullDate);
    validator.addFormat('http-url', regExpr.httpUrl);
    validator.addFormat('email', regExpr.email);
    validator.addFormat('directory', regExpr.directory);
    validator.addFormat('url-path', regExpr.urlPath);
    validator.addFormat('http-method', regExpr.httpMethod);
    validator.addFormat('url-parameter', regExpr.urlParameter);
    validator.addFormat('type-url-parameter', regExpr.typeUrlParameter);
    validator.addFormat('security-scheme', regExpr.securityScheme);
    const valid = validator.validate(fullSchema, object);

    if (!valid) {
        throw new SchemaError(validator.errorsText());
    }

    return valid;
};
