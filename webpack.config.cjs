const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const prodConfig = {
    mode: 'production',
    entry: {
        index: path.join(__dirname, '/app/public/src/index.js'),
        maps: path.join(__dirname, '/app/public/src/maps.js'),
        dropImage: path.join(__dirname, '/app/public/src/dropImage.js'),
        panel: path.join(__dirname, '/app/public/src/panel.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/dist/public/js')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: path.join(__dirname, '/app/public/img'), to: path.join(__dirname, '/dist/public/img')},
                {from: path.join(__dirname, '/app/public/favicon.png'), to: path.join(__dirname, '/dist/public')},
                {from: path.join(__dirname, '/app/public/css/custom.css'), to: path.join(__dirname, '/dist/public/css')},
                {from: path.join(__dirname, '/app/views'), to: path.join(__dirname, '/dist/views')}
            ]
        })
    ]
}

const devConfig = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, '/app/public/src/index.js'),
        maps: path.join(__dirname, '/app/public/src/maps.js'),
        dropImage: path.join(__dirname, '/app/public/src/dropImage.js'),
        panel: path.join(__dirname, '/app/public/src/panel.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/app/public/js')
    },
}

module.exports = [devConfig, prodConfig];