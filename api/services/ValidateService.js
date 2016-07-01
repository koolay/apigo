"use strict";

/**
 *
 */

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var Ajv = require('ajv');
var mongoose = require('mongoose');
var jsen = require('jsen');

var ajv = Ajv({
    allErrors: true
});

module.exports = {
    isEmpty: function(obj) {
        return !Object.keys(obj).length;
    },
    //验证是json schema格式对象
    validSchema: function(schema) {
        return true;
    }


}
