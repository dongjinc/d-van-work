const path = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
/** @type {(import('webpack').Configuration)} */
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions: [".ts", ".tsx",".js"],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    mode: 'production',
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader",
                options:{
                    transpileOnly: true
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            title: 'demo',
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 1060,
        stats: 'minimal'
    }
}