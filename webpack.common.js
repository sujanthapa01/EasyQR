const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve(__dirname, 'src/popup/index.jsx'),
        options: path.resolve(__dirname, 'src/options/index.jsx'),
        newtab: path.resolve(__dirname, 'src/tabs/index.jsx'), // Entry for newtab
       
        
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
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
                                plugins: [tailwindcss, autoprefixer], // Tailwind and autoprefixer plugins
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[hash][ext]', // Hash-based naming for assets
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false, // Avoid cleaning assets not part of the build
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/static/manifest.json'), to: path.resolve(__dirname, 'dist') },
                { from: path.resolve(__dirname, 'src/static/icon.png'), to: path.resolve(__dirname, 'dist') },
            ],
        }),
        ...getHtmlPlugins(['popup', 'options', 'newtab']), // Ensure HTML plugins match the entries
    ],
    resolve: {
        extensions: ['.jsx', '.js'], // Support JSX and JS files
    },
    output: {
        filename: '[name].js', // Output file naming based on entry
        path: path.resolve(__dirname, 'dist'), // Output directory
        assetModuleFilename: 'assets/[name].[hash][ext]', // Consistent asset naming
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // Optimize code splitting
        },
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: `${chunk.charAt(0).toUpperCase() + chunk.slice(1)} Page`, // Dynamic titles based on chunk name
        filename: `${chunk}.html`, // Match output file names
        chunks: [chunk], // Include only the relevant chunk
    }));
}
