const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const child_process = require("child_process");//子进程，nodejs本身的模块，不用install

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
const URL = 'http://localhost:8080';


new WebpackDevServer(webpack(config), { // Start a server
    hot: true, // With hot reloading
    inline: false,
    historyApiFallback: true,
    quiet: true, // Without logging
    proxy: {}
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at ' + URL);
    child_process.exec(cmd + ' ' + URL);
    // opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});
});
