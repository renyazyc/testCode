const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./index.css');


module.exports = {
    devtool: "source-map",
    entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server','./src/index.jsx'],
    output: {
        path:__dirname+'/dist',
        filename: 'index.js',
        publicPath:'/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                // loader:"babel-loader?presets[]=es2015,presets[]=react,plugins[]=transform-decorators-legacy",webpack1
                // use:"babel-loader?presets[]=es2015,presets[]=react,plugins[]=transform-decorators-legacy",webpack2
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','react'],
                        plugins:['transform-decorators-legacy']
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.scss$/,
                use: extractCSS.extract({
                    fallback:"style-loader",
                    use:['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.less$/,
                use: extractCSS.extract({
                    fallback:"style-loader",
                    use:['css-loader', 'less-loader']
                })
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    },
    plugins:[
        extractCSS,
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.less', '.scss', '.css']
    }
}