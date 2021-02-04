const path = require('path');
const webpack = require('webpack');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    name: "business-card-maker-setting",
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
                                browsers: ['> 5% in KR', 'last 2 chrome versions']
                            },
                            debug: true
                        }], 
                        ['@babel/preset-react']
                        
                    ],
                    plugins : [
                        ['@babel/plugin-proposal-class-properties'],
                        ["@babel/plugin-transform-runtime",{corejs: 3}]
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
    }
};