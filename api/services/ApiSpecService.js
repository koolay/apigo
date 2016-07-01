/**
 * API Spec Service
 */
var fury                 = require('fury');
var fury_adapter_swagger = require('fury-adapter-swagger');
var fury_adapter_apibserializer = require('fury-adapter-apib-serializer');
var apib2swagger         = require('apib2swagger');
var aglio                = require('aglio');

module.exports = {

  /**
   * api blueprint转swagger
   *
   * 参数：
   * blueprint                - api blueprint数据
   * callback(error, result)  - swagger数据：result.swagger
   */
  blueprint2swagger: function(blueprint,callback){
    apib2swagger.convert(blueprint, callback);
  },

  /**
   * swagger转api blueprint
   *
   * 参数：
   * swagger                     - swagger json
   * callback(error, blueprint)  - blueprint数据：blueprint
   */
  swagger2blueprint: function(swagger,callback){
    fury.use(fury_adapter_apibserializer);
    fury.use(fury_adapter_swagger);

    fury.parse({source: swagger}, function (parseErr, res) {
      if (parseErr) {
        return callback(parseErr);
      }

      fury.serialize({api: res.api}, function (serializeErr, blueprint) {
        if (serializeErr) {
          return callback(serializeErr);
        }

        callback(null, blueprint);
      });
    });
  },

  /**
   * 通过Blueprint数据渲染Api html
   *
   * 参数：
   * blueprint                      - api blueprint数据
   * callback(err, html, warnings)  - html文档
   */
  renderBlueprintHtml: function(blueprint,callback){
    var options = {
      themeVariables: 'flatly'
    };

    aglio.render(blueprint, options, callback);
  }
};

