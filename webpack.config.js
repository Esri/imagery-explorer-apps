const dotenv = require('dotenv');
const path = require('path');
const package = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');

const config = require('./src/config.json');

module.exports =  (env, options)=> {

    // check the mode of the build
    const mode = options.mode;
    const devMode = mode === 'development';

    /**
     * Load the environment variables from the specified environment file.
     * The environment file name should be specified using `--env envFileName=.env.development` or `--env envFileName=.env.production`.
     * If the environment file name is not specified, the default value will be `.env`.
     */
    const envFileName = env?.envFileName || '.env';

    // Get the path to the environment file
    const envPath = path.resolve(__dirname, envFileName);

    // check if the environment file exists
    if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file ${envPath} does not exist. Please create it based on .env.template\n`);
    }

    // Load the environment variables
    const envConfig = dotenv.config({ path: envPath }).parsed || {};
    console.log(`Loaded environment variables from ${envPath}\n`);

    // throw an error if the environment variables is an empty object
    if (Object.keys(envConfig).length === 0) {
        throw new Error(`No environment variables found in the environment file ${envPath}. Please check the file content.`);
    }

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
        throw new Error(
            'A valid `app` name is not found in environment variables, '+
            'try `npm run start-landsat`.\n'
        )
    }

    /**
     * Get the app configuration from the `config.json` file.
     * The app configuration should be an object with the following properties:
     * 
     * - `title`: the title of the app, e.g. `Landsat Explorer`
     * - `description`: the description of the app, e.g. `Explore and begin to unlock the wealth of information provided by Landsat...`
     * - `webmapId`: the ID of the web map to use in the app, e.g. `81609bbe235942919ad27c77e42c600e`
     * - `pathname`: the pathname of the app, e.g. `/landsatexplorer`
     * - `entrypoint`: the entry point of the app, e.g. `./src/landsat-explorer/index.tsx`
     */
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

    // Validate that the entrypoint is defined.
    // The entrypoint must be a relative path (e.g. `./src/landsat-explorer/index.tsx`)
    // and should be specified in the `config.json` file under the corresponding app key.
    if(!entrypoint){
        throw new Error(
            `entrypoint for "${app}" is not found, `+
            'please update `./src/config.json` to make sure it includes entrypoint of the app to start'
        )
    }
    console.log(`${env['WEBPACK_BUILD'] ? 'Building' : 'Starting'} "${app}"\n`);

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
            new DefinePlugin({
                /**
                 * node running environment
                 */
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                /**
                 * name of the imagery explorer app to start/build
                 */
                WEBPACK_DEFINED_APP_NAME: JSON.stringify(app),
                /**
                 * APP ID for Landsat Explorer app
                 */
                ENV_LANDSAT_EXPLORER_APP_ID: JSON.stringify(envConfig.LANDSAT_EXPLORER_APP_ID),
                /**
                 * URL for Landsat Level 2 original service
                 */
                ENV_LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL: JSON.stringify(envConfig.LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL),
                /**
                 * URL for Landsat Level 2 proxy service
                 */
                ENV_LANDSAT_LEVEL_2_PROXY_SERVICE_URL: JSON.stringify(envConfig.LANDSAT_LEVEL_2_PROXY_SERVICE_URL),
                /**
                 * APP ID for Sentinel-2 Explorer app
                 */
                ENV_SENTINEL2_EXPLORER_APP_ID: JSON.stringify(envConfig.SENTINEL2_EXPLORER_APP_ID),
                /**
                 * URL for Sentinel-2 original service
                 */
                ENV_SENTINEL2_ORIGINAL_SERVICE_URL: JSON.stringify(envConfig.SENTINEL2_ORIGINAL_SERVICE_URL),
                /**
                 * URL for sentinel-2 proxy service
                 */
                ENV_SENTINEL2_PROXY_SERVICE_URL: JSON.stringify(envConfig.SENTINEL2_PROXY_SERVICE_URL),
                /**
                 * APP ID for Sentinel-1 Explorer app
                 */
                ENV_SENTINEL1_EXPLORER_APP_ID: JSON.stringify(envConfig.SENTINEL1_EXPLORER_APP_ID),
                /**
                 * URL for Sentinel-1 original service
                 */
                ENV_SENTINEL1_ORIGINAL_SERVICE_URL: JSON.stringify(envConfig.SENTINEL1_ORIGINAL_SERVICE_URL),
                /**
                 * URL for sentinel-1 proxy service
                 */
                ENV_SENTINEL1_PROXY_SERVICE_URL: JSON.stringify(envConfig.SENTINEL1_PROXY_SERVICE_URL),
                /**
                 * APP ID Land Cover Explorer app
                 */
                ENV_LANDCOVER_EXPLORER_APP_ID: JSON.stringify(envConfig.LANDCOVER_EXPLORER_APP_ID),
                /**
                 * URL for Sentinel-2 Land Cover service
                 */
                ENV_SENTINEL2_LANDCOVER_SERVICE_URL: JSON.stringify(envConfig.SENTINEL2_LANDCOVER_SERVICE_URL),
                /**
                 * URL for Sentinel-2 Land Cover statistics service
                 */
                ENV_SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL: JSON.stringify(envConfig.SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL),
                /**
                 * ArcGIS Online portal root URL
                 */
                ENV_ARCGIS_PORTAL_ROOT_URL: JSON.stringify(envConfig.ARCGIS_PORTAL_ROOT_URL),
                /**
                 * Raster Analysis service root URL
                 */
                ENV_RASTER_ANALYSIS_ROOT_URL: JSON.stringify(envConfig.RASTER_ANALYSIS_ROOT_URL),
                /**
                 * Application ID for the NLCD Land Cover Explorer app.
                 */
                ENV_NLCD_LANDCOVER_EXPLORER_APP_ID: JSON.stringify(envConfig.NLCD_LANDCOVER_EXPLORER_APP_ID),
                /**
                 * URL for the NLCD Land Cover service.
                 */
                ENV_NLCD_LANDCOVER_SERVICE_URL: JSON.stringify(envConfig.NLCD_LANDCOVER_SERVICE_URL),
                /**
                 * Web map ID for the Imagery Explorer app.
                 * Optional: defaults to `f8770e0adc5c41038026494b871ceb99` if not specified.
                 */
                ENV_WEB_MAP_ID: JSON.stringify(envConfig.IMAGERY_EXPLORER_WEB_MAP_ID),
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
                title,
                favicon: './public/esri-favicon-light-32.png',
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
                    'last-modified':  new Date().getTime().toString()
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