# Environment setup

```bash
npm install --save react react-dom

npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin webpack webpack-dev-server
```

# Webpack

### babel loader

* `babel-preset-env`: transform ES2015, new syntax to old code that older browser can understand
* `babel-preset-react`: transform react jsx to react.createElement()

package.json:

```json
"babel": {
  "presets": ["react", "env"]
}
```

### css-loader

any css file that contains import, url(..img) => require()

### Running Webpack

`npm start` will run `webpack-dev-server --open`, which will start running babel and react transform, cache result. So now "dist" folder is not showing. In production we will generate the dist folder. 