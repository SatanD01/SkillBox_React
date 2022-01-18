const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const IS_DEV = NODE_ENV == 'development';
const IS_PROD = NODE_ENV == 'production';



function setupDevtool() {
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
}
module.exports = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', 'tsx', '.json']
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({template: path.resolve((__dirname, 'index.html'))})
    ],
    devServer: {
        port: 2000,
        open: true,
        hot: IS_DEV
    },
    devtool: setupDevtool()
};