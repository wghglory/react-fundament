# Add nodejs server, but still client-side rendering

In this chapter, we will add a node server environment and mongodb to make **SPA**. The server uses "dist/index.html" as static resource. I'm not going to use ejs template.

Steps to setup node server environment:

* Add server folder, config folder and server.js, so we have node server, express, mongoose, model, api router, controller.
* server.js configures any file in dist folder as a static resource. So after running webpack, dist/index.html, css, js will be working well.

## Client-side Routing is not working

After add nodejs server, if you request `localhost/task` directly, you will see "Cannot GET /task". Now only way to see that page is to request root, then click "todo" react-router link, the url will be `localhost/task`. So to sum up, directly targeting `localhost/task` or refreshing page will give us "Cannot GET /task". The reason is our server doesn't have this resource by physical path. To solve this issue, let's recap why webpack-dev-server and firebase work well.

### Recap

We have used webpack-dev-server and firebase before. Both provides a server environment and they have a feature which can make page manually refreshing working well.

Webpack does this by **publicPath** and **historyApiFallback**:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // create index.html injecting index_bundle.js in dist folder
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, 
      {
        test: /\.csv$/,
        loader: 'dsv-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new ExtractTextPlugin('build.css')
  ]
};

module.exports = config;
```

firebase.json:

in chapter12: Configure as a single-page app (rewrite all urls to /index.html)? (y/N) **y**

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### connect-history-api-fallback for nodejs server

`npm install --save connect-history-api-fallback`

server/config/express.js

```diff
// Load the module dependencies
const config = require('./config'),
  express = require('express');

// Express middleware for single page apps with client side routing.
+ const history = require('connect-history-api-fallback');

// Define the Express configuration method
module.exports = function (db) {
  // Create a new Express application instance
  var app = express();

  // Load the routing files
  require('../server/routers/task.server.router')(app);

+  // SPA, use html5 history Api, must before configure static file
+  app.use(history({}));

  // Configure static file serving
  app.use(express.static('./dist'));

  // Return the Server instance
  return app;
};
```