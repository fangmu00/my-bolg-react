const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolve } = path;

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    './app/app.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  externals: {
    react: 'var React',
    'react-dom': 'var ReactDOM',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new HtmlWebpackPlugin({
      title: '博客系统后台',
      template: 'template/index.hbs',
    }), // html模板
  ],
};
