/**
 * Created by wuyuedong on 16/5/19.
 */

var path = require('path');
var webpack = require('webpack');
var packageConfig = require('./package.json');
var dir_src = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'dist');


var env = process.env.NODE_ENV;
module.exports = {
    devtool: 'source-map',
    entry: {
        cookies: [path.resolve(dir_src, 'cookies.js')], // 按模块或页面分最小单元,
    },
    output: {
        //打包之后的模块化方式
        libraryTarget: "umd",
        library: "cookies",
        //打包文件存放路径
        path: path.resolve(dir_build),
        filename: '[name].min.js' //[name], [hash], [chunkhash]
    }
};