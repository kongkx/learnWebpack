var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: config.devServer.contentBase,
  proxy: {
    "/api": {
      target: {
        host: "drupal8.dev",
        protocol: "http:",
        port: '80'
      },
      // ignorePath: true,
      pathRewrite: {'^/api' : ''},
      changeOrigin: true,
      secure: false
    }
  }
}).listen(config.devServer.port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:'+config.devServer.port+'/');
});
