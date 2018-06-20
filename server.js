const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const child_process = require("child_process");//子进程，nodejs本身的模块，不用install

const port=9000;

switch (process.platform) {
    case 'wind32':
        cmd = 'start';
        break;

    case 'linux':
        cmd = 'xdg-open';
        break;

    case 'darwin':
        cmd = 'open';
        break;
}
const URL = 'http://localhost:'+port;


new WebpackDevServer(webpack(config), { // Start a server
    publicPath: "/sat",
    hot: true, // With hot reloading
    inline: false,
    historyApiFallback: {
      index: '/sat/index.html'
    },
    quiet: false, // Without logging
    proxy: {},
    disableHostCheck: true
}).listen(port, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at ' + URL);
    child_process.exec(cmd + ' ' + URL);
    // opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});
});
