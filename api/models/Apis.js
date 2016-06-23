/**
 * Apis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id: {
          type: 'string',
          required: true,
          unique: true
      },
      name: {
          type: 'string',
          required: true,
          unique: true
      },
      request_host: {
          type: 'string',
          required: true
      },
      request_path: {
          type: 'string',
          required: true,
      },
      strip_request_path: {
          type: 'boolean',
          required: false,
          defaultsTo:false
      },
      preserve_host: {
          type: 'boolean',
          required: false,
          defaultsTo:false

      },
      upstream_url: {
          type: 'string',
          required: true,
      }

  }
};

