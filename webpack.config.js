const path = require('path');
const os = require('os');
const package = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const computerName = os.hostname();

/**
 * the App ID and some of the proxy service URLs of the app only works with `arcgis.com` domain, 
 * therefore we need to run the webpack dev server using the host name below `${computerName}.arcgis.com` instead of `localhost`.
 */
const hostname = computerName.includes('Esri') 
    ? `${computerName}.arcgis.com` 
    : 'localhost';

const config = require('./src/config.json');

module.exports =  (env, options)=> {

    const devMode = options.mode === 'development' ? true : false;

    process.env.NODE_ENV = options.mode;

    // name of the explorer app to start/build:
    const app = env['app']

    if(!app){
        throw new Error(
            'A valid `app` name is not found in environment variables, '+
            'try `npm run start-landsat`.\n'
        )
    }

    const appConfig = config.apps[app]

    if(!appConfig){
        throw new Error(
            `config data for "${app}" is not found, `+
            'please update `./src/config.json` to make sure it includes config data for this app'
        )
    }

    const {
        entrypoint,
        title,
        description,
        pathname,
    } = appConfig;

    if(!entrypoint){
        throw new Error(
            `entrypoint for "${app}" is not found, `+
            'please update `./src/config.json` to make sure it includes entrypoint of the app to start'
        )
    }

    console.log(`starting ${app}\n`);

    return {
        mode: options.mode,
        devServer: {
            server: 'https',
            host: hostname,
            allowedHosts: "all",
            port: 8080
        },
        entry: entrypoint,
        output: {
            path: path.resolve(__dirname, `./dist/${app}`),
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            clean: true
        },
        devtool: devMode ? 'source-map' : false,
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            alias: {
                '@shared': path.resolve(__dirname, 'src/shared/'),
                '@landsat-explorer': path.resolve(__dirname, 'src/landsat-explorer/'),
                '@landcover-explorer': path.resolve(__dirname, 'src/landcover-explorer/'),
                '@typing': path.resolve(__dirname, 'src/types/'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/i,
                    // include: path.resolve(__dirname, 'src'),
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader", 
                            options: {
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'postcss-loader'
                        }
                    ],
                },
                { 
                    test: /\.(woff|woff2|ttf|eot)$/,  
                    loader: "file-loader",
                    options: {
                        name: '[name].[contenthash].[ext]',
                    }
                },
                { 
                    test: /\.(png|jpg|gif|svg)$/,  
                    loader: "file-loader",
                    options: {
                        name: '[name].[contenthash].[ext]',
                    }
                },
            ]
        },
        plugins: [
            // need to use ForkTsCheckerWebpackPlugin because Babel loader ignores the compilation errors for Typescript
            new ForkTsCheckerWebpackPlugin(),
            new DefinePlugin({
                /**
                 * node running environment
                 */
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                /**
                 * name of the imagery explorer app to start/build
                 */
                WEBPACK_DEFINED_APP_NAME: JSON.stringify(app),
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
            }),
            // copy static files from public folder to build directory
            new CopyPlugin({
                patterns: [
                    { 
                        from: "public/**/*", 
                        globOptions: {
                            ignore: ["**/index.html"],
                        },
                    }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                title,
                meta: {
                    title,
                    description,
                    author: package.author,
                    keywords: Array.isArray(package.keywords) 
                        ? package.keywords.join(',') 
                        : undefined,
                    'og:title': title,
                    'og:description': description,
                    'og:url': `https://livingatlas.arcgis.com${pathname}/`,
                    'og:image': `https://livingatlas.arcgis.com${pathname}/public/thumbnails/${app}.jpg`,
                    'last-modified':  new Date().toString()
                },
                minify: {
                    html5                          : true,
                    collapseWhitespace             : true,
                    minifyCSS                      : true,
                    minifyJS                       : true,
                    minifyURLs                     : false,
                    removeComments                 : true,
                    removeEmptyAttributes          : true,
                    removeOptionalTags             : true,
                    removeRedundantAttributes      : true,
                    removeScriptTypeAttributes     : true,
                    removeStyleLinkTypeAttributese : true,
                    useShortDoctype                : true
                }
            }),
            // !devMode ? new CleanWebpackPlugin() : false,
            !devMode ? new BundleAnalyzerPlugin() : false
        ].filter(Boolean),
        optimization: {
            // splitChunks: {
            //     cacheGroups: {
            //         // vendor chunk
            //         vendor: {
            //             // sync + async chunks
            //             chunks: 'all',
            //             name: 'vendor',
            //             // import file path containing node_modules
            //             test: /node_modules/
            //         }
            //     }
            // },
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        }
                    }
                }), 
                new CssMinimizerPlugin()
            ]
        },
    }

};