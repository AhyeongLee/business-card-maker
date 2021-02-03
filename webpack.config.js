const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
    name: "business-card-maker-setting",
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./src/index'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(axios|@redux-saga|redux-logger))/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['> 5% in KR', 'last 2 chrome versions', 'ie > 9']
                            },
                            debug: true
                        }], 
                        ['@babel/preset-react']
                        
                    ],
                    plugins : [
                        // ['react-refresh/babel'],
                        ['@babel/plugin-proposal-class-properties'],
                        ["@babel/plugin-transform-runtime",
                            {
                              corejs: 3
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'postcss-preset-env',
                            ],
                        },
                    },
                }
            ]
        },
    ],
    },
    plugins: [
        // new RefreshWebpackPlugin(),
        new DotenvWebpack(),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/public/',
        environment: {
            arrowFunction: false,
            const: false,
            destructuring: false,
            dynamicImport: false,
            forOf: false,
            module: false,
        }
    },
    devServer: {
        publicPath: '/public/',
        hot: true,
        historyApiFallback : {
            index: '/public/index.html'
        }
    },
};