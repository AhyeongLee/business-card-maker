const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

// import path from 'path';
// import webpack from 'webpack';
// import RefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import DotenvWebpack from 'dotenv-webpack';

module.exports = {
    name: "business-card-maker-setting",
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['@babel/polyfill','./src/index'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude : [
                    /\bcore-js\b/,
                    /\bwebpack\/buildin\b/
                ],
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['> 5% in KR', 'last 2 chrome versions'],
                            },
                            
                            
                        }], 
                        '@babel/preset-react',
                    ],
                    plugins : [
                        ['react-refresh/babel'],
                        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
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
        new RefreshWebpackPlugin(),
        new DotenvWebpack(),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/public/',
    },
    devServer: {
        publicPath: '/public/',
        hot: true,
        historyApiFallback : {
            index: '/public/index.html'
        } , 
        
    },
};