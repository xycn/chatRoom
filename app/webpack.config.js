//usage:http://ctheu.com/2015/05/14/using-react-hot-loader-with-a-webpack-dev-server-and-a-node-server/
//TODO:nodejs server app.express.js->  http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack');
var path=require('path');
var time =new Date().toLocaleDateString();

module.exports = {
  entry:  {
    main:'./public/js/entry'
    // ,func:'./public/js/func'
  },
  output: {
    path: path.join(__dirname,'./public/js/build'),
    filename: '[name].js',
    sourceMapFilename:'[file].map'
  },
  target: 'web',
  // externals: /node_modules/,
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      // {test: /\.css$/, loader: 'style!css'},
      {
       test: /\.js?$/,
       exclude: /(node_modules|bower_components)/,
       loader:'babel'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by tach  '+time)
  ]
}
