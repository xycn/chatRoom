//usage:http://ctheu.com/2015/05/14/using-react-hot-loader-with-a-webpack-dev-server-and-a-node-server/
//TODO:nodejs server app.express.js->  http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack');
var path=require('path');
var time =new Date().toLocaleDateString();
module.exports = {
  // entry:  path.join(__dirname,'public/js/entry.js'),
  entry:  [   'webpack-dev-server/client?http://0.0.0.0:3001',
              'webpack/hot/only-dev-server',
              path.join(__dirname,'public/js/entry.js')
           ],
  output: {
    path: './public/js/build',
    filename: 'main.js',
    publicPath: "http://localhost:3001/public/"
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      // {test: /\.css$/, loader: 'style!css'},
      {
       test: /\.js?$/,
       exclude: /(node_modules|bower_components)/,
       loader:'babel-loader',
       loaders: ['react-hot-loader','babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by tach  '+time),
    new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
