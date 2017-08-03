const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');


new WebpackDevServer(webpack(config), { // Start a server
    hot: true, // With hot reloading
    inline: false,
    historyApiFallback: true,
    quiet: true, // Without logging
    proxy: {}
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    } else {
    }
});
