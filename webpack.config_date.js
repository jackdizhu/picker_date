const webpack = require('webpack')
const path = require('path')

var _path = './';

module.exports = {
    entry: {
        index: _path + 'src/picker_date.js',
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, './'),
        // 正常配置
        // publicPath: 'dist/',
        // php   服务器配置
        publicPath: '../dist/',
        filename: 'js/picker_date.min.js',
        library: 'js/[name].[chunkhash:8].js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        // loader: 'style-loader!css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
                        loader: 'style-loader!css-loader',
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader?limit=8192&name=img/[name].[hash:8].[ext]',
                    },
                ],
            },
            {
    　　　　　　test: /\.html$/,
    　　　　　　loader: 'html-withimg-loader'
    　　　　},
            // 使用vue-loader 加载 .vue 结尾的文件
            {
             test: /\.vue$/,
             loader: ['vue-loader']
            }
        ],
    },
    // plugins: [new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.ModuleConcatenationPlugin()],
}
