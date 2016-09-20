var path = require('path');
var webpack = require('webpack');

var devPort = 3000;

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:'+devPort,
      'webpack/hot/only-dev-server',
      './src/app.js',
    ],
    bio: [
      'webpack-dev-server/client?http://localhost:'+devPort,
      'webpack/hot/only-dev-server',
      './src/bio.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "[name].bundle.js"
  },
  resolve: {
    extension: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  devServer: {
    hot: true,
    contentBase: './demo',
    port: devPort,
  }
}
