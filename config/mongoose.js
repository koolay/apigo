module.exports.mongoose = {

  // The Mongo connection URI
  // (see https://github.com/mikermcneil/sails-hook-orm-mongoose/blob/master/README.md#configuration for more info)
  //
  uri: 'mongodb://120.25.171.21:27017/apigo',
  connectionOpts: {
       db: { native_parser: true },
       server: { poolSize: 5 },
       replset: { rs_name: 'apigo' },
       // user: '',
       // pass: ''
  },
};
