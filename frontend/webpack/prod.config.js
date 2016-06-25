import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig, { commons, vendors } from './base.config';
import { baseAlias } from '../src/config';

baseConfig.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
})
baseConfig.module.loaders.push({
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!less')
})

export default Object.assign({}, baseConfig, {
	entry: { 
    main: [
      './src/client'
    ],
    common: commons,
    vendor: vendors
	},
  output: {
    path: path.resolve('./static/assets'),
    filename: '[name].[chunkhash:8].js',
    publicPath: baseAlias + '/assets/',
    /**
     * 按需加载的JS，其文件名配置
     * [name] 由 require.ensure([], function(){} , name) 产生，没有则值为[id]（webpack生成的ID）
     */
    chunkFilename: '[id].[chunkhash:8].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve('./src/static/index.template'),
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
})