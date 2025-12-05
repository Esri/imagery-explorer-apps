const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const validateEnv = require('./webpack/validateEnvironmentVariables');
const getEntryPointByApp = require('./webpack/getEntryPoint');
const loadEnvironmentVariables = require('./webpack/loadEnvironmentVariables');
const getMetaTagsDataForApp = require('./webpack/getMetaTagsDataForApp');
const getGlobalConstants = require('./webpack/getGlobalContants');
const { ERROR_TERMIAL_OUTPUT_COLOR } = require('./webpack/constants');

module.exports =  (env, options)=> {

    // check the mode of the build
    const mode = options.mode;
    const devMode = mode === 'development';

    /**
     * Determine the app to start/build from the environment variables.
     * The app name should be specified using `--env app=landsatexplorer`, `--env app=sentinel2explorer`, etc.
     * If the app name is not specified, an error will be thrown.
     * 
     * The app name should match the key in the `config.json` file located in `./src/config.json`.
     * For example, if the app name is `landsatexplorer`, the config.json file should have a key `landsatexplorer` with the app configuration.
     */
    const app = env['app']

    // If the app is not specified, throw an error
    if(!app){
        // throw new Error(
        //     'A valid `app` name is not found in environment variables, '+
        //     'try `npm run start-landsat`.\n'
        // )
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            'No application specified for the build.\n' +
            'Please specify the application using `--env app=APP_NAME`, ' +
            'where APP_NAME is one of the supported applications (e.g., landsatexplorer, sentinel2explorer) that match the keys in src/config.json. ' +
            '\n'
        );
        process.exit(1);
    }
    console.log(`Starting webpack build for "${app}"\n`);

    /**
     * Load the environment variables from the specified environment file.
     * The environment file name should be specified using `--env envFileName=.env.development` or `--env envFileName=.env.production`.
     * If the environment file name is not specified, the default value will be `.env`.
     */
    const envFileName = env?.envFileName || '.env';
    const envConfig = loadEnvironmentVariables(envFileName);

    /**
     * Validate that all required environment variables are set for the specified application.
     */
    validateEnv(app, envConfig);

    /**
     * Get global constants to be defined in the webpack build process.
     * These constants are made available in the application code via webpack's DefinePlugin.
     */
    const globalContants = getGlobalConstants(app, envConfig);

    /**
     * Get the entry point file path for the specified application.
     */
    const entrypoint = getEntryPointByApp(app);

    /**
     * Load meta tags data for the specified application.
     */
    const metaTagsData = getMetaTagsDataForApp(app);

    /**
     * Webpack configuration object.
     */
    return {
        mode,
        devServer: {
            server: 'https',
            host: process.env.WEBPACK_DEV_SERVER_HOSTNAME || 'localhost',
            allowedHosts: "all",
            port: 8080
        },
        entry: entrypoint,
        output: {
            path: path.resolve(__dirname, `./dist/${app}`),
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: `[name][contenthash][ext][query]`
        },
        devtool: devMode ? 'source-map' : false,
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            alias: {
                '@shared': path.resolve(__dirname, 'src/shared/'),
                '@landsat-explorer': path.resolve(__dirname, 'src/landsat-explorer/'),
                '@sentinel2-explorer': path.resolve(__dirname, 'src/sentinel-2-explorer/'),
                '@landcover-explorer': path.resolve(__dirname, 'src/landcover-explorer/'),
                '@spectral-sampling-tool': path.resolve(__dirname, 'src/spectral-sampling-tool/'),
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
                    type: 'asset/resource',
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            // need to use ForkTsCheckerWebpackPlugin because Babel loader ignores the compilation errors for Typescript
            new ForkTsCheckerWebpackPlugin(),
            // define environment variables to be used in the application code
            new DefinePlugin({
                ...globalContants
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
                    {   // copy thumbnail image that is used in the index.html meta tags
                        from: `public/thumbnails/${app}.jpg`,
                        to: `public/thumbnails/${app}.jpg`
                    },
                    {   
                        // copy locales files are used for i18n
                        // only need common.json and app specific json file
                        from: 'public/locales',
                        to: 'public/locales',
                        filter: (resourcePath) => {
                            const fileName = path.basename(resourcePath);
                            return fileName === 'common.json' || fileName === app + '.json';
                        }
                    }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                title: metaTagsData.title,
                favicon: './public/esri-favicon-light-32.png',
                meta: {
                    ...metaTagsData
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
        ].filter(Boolean),
        optimization: {
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
            ],
            /**
             * Encountered the `Uncaught ReferenceError: x is not defined` error during the production build. 
             * One suggestion that we found is disabling the `optimization.innerGraph` option is the best way to prevent this issue.
             * 
             * @see https://img.ly/docs/pesdk/web/faq/webpack_reference_error/
             */
            innerGraph: false,
        },
    }

};