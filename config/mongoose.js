module.exports.mongoose = {

  // The Mongo connection URI
  // (see https://github.com/mikermcneil/sails-hook-orm-mongoose/blob/master/README.md#configuration for more info)
  //
  uri: 'mongodb://apigo:apigo2016@ds040089.mlab.com:40089/apigo',
  connectionOpts: {
       db: { native_parser: true },
       server: { poolSize: 5 },
       replset: { rs_name: 'apigo' },
       user: 'apigo',
       pass: 'apigo2016'
  },
};
