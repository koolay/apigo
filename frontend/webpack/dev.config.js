import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig, { commons, vendors } from './base.config';

console.log('path: ', path.resolve('./assets'))

baseConfig.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
})
baseConfig.module.loaders.push({
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less?sourceMap')
})

export default Object.assign({}, baseConfig, {
	devtool: 'source-map',
	entry: {
    main: [
      'webpack-hot-middleware/client',
      './src/client'
    ],
    common: commons,
    vendor: vendors
  },
  output: {
    path: path.resolve('./assets'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common'],
      children: true,
      minChunks: Infinity
    }),
    new ExtractTextPlugin('css/[name].bundle.css')
  ]
})