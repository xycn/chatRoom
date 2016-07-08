//usage:http://ctheu.com/2015/05/14/using-react-hot-loader-with-a-webpack-dev-server-and-a-node-server/
//TODO:nodejs server app.express.js->  http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack');
var path=require('path');
var time =new Date().toLocaleDateString();
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  // entry:  path.join(__dirname,'public/js/entry.js'),
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './public/js/entry'
  ],
  output: {
    path: path.join(__dirname, 'public/js/build'),
    filename: 'main.js',
    publicPath: 'public/js/build/'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
       test: /\.js?$/,
       exclude: /(node_modules|bower_components)/,
       include:path.join(__dirname,'public/js'),
       loaders: ['babel']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by tach  '+time),
    // new webpack.DefinePlugin({
    // 'process.env.NODE_ENV': '"development"'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
