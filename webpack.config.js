const path = require('path');
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isProd = process.env.NODE_ENV === 'production';

const filename = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`;
const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        },
    ];

    if (!isProd) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './assets/icons/icons.js',
        './assets/js/index.js',
        './assets/scss/index.scss',
    ],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
    devtool: isProd ? false : 'source-map',
    devServer: {
        port: 3000,
        hot: isProd,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhiteSpace: isProd,
            },
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/icons/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            }],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isProd,
                            reloadAll: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: [
                                      'ie >= 8', 'last 4 version',
                                    ],
                                }),
                            ],
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images/',
                },
            },
            {
                resource: {
                    test: /\.svg$/,
                },
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: './icons/icons.svg',
                            symbolId: filePath => 'icon-' + path.basename(filePath).split('.')[0],
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {convertColors: {currentColor: false}},
                                {removeAttrs: {attrs: '(opacity)'}},
                            ],
                        },
                    },
                ],
            },
        ],
    },
};
