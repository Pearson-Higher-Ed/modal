const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const demo              = `${__dirname}/demo/demo.js`;
const demoScss          = `${__dirname}/demo/demo.scss`;
const main              = `${__dirname}/demo/main.js`;
const component         = `${__dirname}/index.js`;
const icons             = `${__dirname}/node_modules/@pearson-components/elements-sdk/build/icons/p-icons-sprite-1.1.svg`;
const elements          = `${__dirname}/node_modules/@pearson-components/elements-sdk/build/css/elements.css`;
const fontsDir          = `${__dirname}/node_modules/@pearson-components/elements-sdk/build/fonts/`;
const fonts             = fs.readdirSync(fontsDir, 'utf-8');
const fontsList         = fonts.map(font => fontsDir + font);


module.exports = {
  entry: {
    demo   : [ demo, demoScss ],
    dev    : [ elements, icons, main ],
    dist   : [ component ],
    fonts  : fontsList
  },
  output: {
    path          : path.resolve(__dirname, 'build'),
    filename      : '[name].modal.js',
    publicPath    : '/modal/',
    libraryTarget : 'umd'
  },
  devtool: 'source-map',
  devServer: {
    host               : '0.0.0.0',
    port               : 8081,
    publicPath         : '/modal/',
    hot                : true,
    https              : false,
    overlay            : true,
    watchContentBase   : true,
    historyApiFallback : true,
    disableHostCheck   : true,
    watchOptions       : { poll: true },
    contentBase        : path.join(__dirname, 'build')
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '/icons/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin()
  ]
};
