import fs from 'fs';
import path from 'path';

const getAllFiles = (folderPath) => {
  let stats = fs.statSync(folderPath);

  if (stats.isDirectory()) {
    let dir = folderPath.replace(/\/$/, '') + '/'
    return fs.readdirSync(folderPath).map(filename => {
      let extname = path.extname(filename)
      if (extname === '.js' || extname === '.jsx') {
        return dir + filename
      }
    });   
  }

  return []
}

/**
 * 导出 ./src/helpers/*.js
 */
export const commons = getAllFiles('./src/helpers');

export const vendors = [
  // 'echarts', 
  'es6-promise',
  'history',
  'isomorphic-fetch',
  // 'jquery', 
  'lodash',
  // 'moment',
  'react', 
  'react-dom', 
  'redux', 
  'react-redux', 
  'react-router', 
  'react-router-redux'
];

const baseConfig = {
  entry: undefined,
  output: undefined,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      'redux-actions': path.resolve('./src/libs/redux-actions'),
      'redux-api-middleware': path.resolve('./src/middleware/api-middleware'),
      'moment': 'moment/min/moment-with-locales.min.js',
    }
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      exclude: /node_modules/
    }, { 
      test: /\.json$/, 
      loader: 'json' 
    }, {
      test: /\.jpe?g$|\.gif$|\.png|\.ico|\.swf|\.xap$/,
      loader: 'file?name=images/[name].[ext]'
    }, { 
      test: /\.(eot|ttf|svg|woff2?)$/, 
      loader: 'file?name=fonts/[name].[ext]'
    }],
    noParse: [/moment-with-locales/]
  },
  node: {
    // Mock Node.js modules that Babel require()s but that we don't particularly care about.
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  },
  plugins: undefined
};

export default baseConfig;
