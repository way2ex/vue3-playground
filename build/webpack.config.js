const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const webpack = require('webpack')
const resolve = relativePath => path.resolve(process.cwd(), relativePath)

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        // 配合 preset-env 使用无需引入，也不需要在js中引入
        // polyfill: '@babel/polyfill',
        main: resolve('./src/main.ts'),
    },
    output: {
        path: resolve('./dist'),
        publicPath: '/',
        // 可选模板值 hash, contenthash, chunkhash, name(module name), id(module id), query(阙疑),
        // 也可以用函数，函数参数会传入包含以上内容的对象
        // 开发环境不可以使用 contenthash 和 chunkhash，
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js',
    },
    resolve: {
        extensions: [ '.vue', '.tsx', '.ts', '.js' ],
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            'vue': '@vue/runtime-dom',
            '@': resolve('./src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                },
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // 7.4 开始推荐使用 core-js/stable 和 regenerator-time，只需要配置 env 的 usage，
                            // 卸载polyfill后 安装core-js3, 不用额外配置即可
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: 3,
                            }],
                        ],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./public/index.html'),
            filename: 'index.html',
            // chunks:['main'] // 与入口相对应，用于多页应用
        }),
        new CopyWebpackPlugin({
            patterns: [
                resolve('./public/favicon.ico'),
                resolve('./public/_redirects'),
            ],
        }),
        new VueLoaderPlugin(),
        // 开发环境
        // new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 9090,
        hot: true,
        contentBase: resolve('./dist'),
        // 404 will fallback to index.html
        historyApiFallback: true,
        // By passing an object this behavior can be controlled further using options like rewrites:
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: '/views/landing.html'
        //     ],
        // },
    },
}
