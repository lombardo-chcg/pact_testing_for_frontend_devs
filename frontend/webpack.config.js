var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: path.resolve("js"),
  entry: ["./app"],
  output: {
    path: path.resolve("build/"),
    publicPath: "/public/assets/",
    filename: "bundle.js"
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader")
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      }
    ]
  },

  devServer: {
    contentBase: "public",
    proxy: {
    '/api/users': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api/users' : '/users'
        }
      }
    }
  },

  resolve: {
    extensions: [
      "",
      ".js",
      ".es6"
    ]
  }
}
