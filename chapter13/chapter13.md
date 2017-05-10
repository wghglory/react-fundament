We're going to do these:

* css separation from js -- wepback config
* sass

# Separate css

```bash
npm i extract-text-webpack-plugin --save-dev
```

Based on environment, webpack knows when to minify css.

```javascript
// webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build.css')
  ]
};
...
```

Now when you `npm run build`, build.css is separated from js.

# Sass

Prepare: cut index.css content into index.scss and update as needed

```bash
npm install sass-loader node-sass --save-dev
```

```diff
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
+     {
+       test: /\.scss$/,
+       use: ExtractTextPlugin.extract({
+         fallback: 'style-loader',
+         use: ['css-loader', 'sass-loader']
+       })
+     }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build.css')
  ]
};
...
```