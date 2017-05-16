项目hosting地址：https://github-battle-react-cf433.firebaseapp.com

# Eslint fix errors

```bash
node_modules/.bin/eslint "app/**/*.js" --fix
```

It's better to add this into package.json

```json
  "scripts": {
    "start": "webpack-dev-server --open",
    "fix": "node_modules/.bin/eslint 'app/**/*.js' --fix"
  },
```

# Webpack.config.js

```diff
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // create index.html injecting index_bundle.js in dist folder
+ var webpack = require('webpack');

+ var config = {
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
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};

+ // 1. package.json npm run build will set node env production. 
+ // 2. NODE_ENV in DefinePlugin: webpack will build this into bundle.js so React realizes it's for production now
+ if (process.env.NODE_ENV === 'production') {
+   config.plugins.push(
+     new webpack.DefinePlugin({
+       'process.env': {
+         'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
+       }
+     }),
+     new webpack.optimize.UglifyJsPlugin()
+   )
+ }

+ module.exports = config;
```

# package.json

```diff
{
  "scripts": {
    "start": "webpack-dev-server --open",
    "fix": "node_modules/.bin/eslint 'app/**/*.js' --fix",
+    "build": "NODE_ENV='production' webpack -p",
+    "firebase-init": "firebase login && firebase init",
+    "deploy": "npm run build && firebase deploy"
  },
  "babel": {
    "presets": [
      "react",
      "env"
    ]
  },
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-env": "^1.4.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.1",
    "eslint-plugin-react": "^7.0.0",
    "html-webpack-plugin": "^2.28.0",
    "style-loader": "^0.17.0",
+    "firebase-tools": "^3.7.0",
+    "webpack": "^2.5.1",
    "webpack-dev-server": "^2.4.5"
  },
  "dependencies": {
    "axios": "^0.16.1",
    "eslint": "^3.19.0",
    "prop-types": "^15.5.8",
    "query-string": "^4.3.4",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-router-dom": "^4.1.1"
  }
}
```

# Hosting thru firebase

1. Create a app "github-battle-react" in firebase.com (my account is google account wghglory89@gmail.com)

1. `npm run firebase-init`

1. ? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. (Press <space> to select)

    - ◯ Database: Deploy Firebase Realtime Database Rules
    - ◯ Functions: Configure and deploy Cloud Functions
    - ❯◯ **Hosting: Configure and deploy Firebase Hosting sites**

1. ? Select a default Firebase project for this directory:

    - [don't setup a default project]
    - ❯ **github-battle-react (github-battle-react-cf433)**
    - [create a new project]

1. ? What do you want to use as your public directory? (public) **dist**

1. ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) **y**

    > firebase has this feature, which behaves same as `publicPath: '/'` and `devServer: { historyApiFallback: true }`

1. ? File dist/index.html already exists. Overwrite? (y/N) **n**

_Output_:

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!

---

`npm run deploy`

_Output_:

i  deploying hosting
i  hosting: preparing dist directory for upload...
✔  hosting: 2 files uploaded successfully
i  starting release process (may take several minutes)...

✔  Deploy complete!

Project Console: 
https://console.firebase.google.com/project/github-battle-react-cf433/overview

Hosting URL: https://github-battle-react-cf433.firebaseapp.com