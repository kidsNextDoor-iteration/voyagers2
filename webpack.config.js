const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './client/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  mode: 'development',
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader', // or 'url-loader' if you choose that option
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Specify the output directory for images
            },
          },
        ]
      },
    ]
  }

}