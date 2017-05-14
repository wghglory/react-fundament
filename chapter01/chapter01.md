# Environment setup

```bash
npm install --save react react-dom

npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin webpack webpack-dev-server
```

# Webpack

### babel loader

* "babel-core": "^6.24.1",
* "babel-loader": "^7.0.0",
* `babel-preset-env`: transform ES2015, new syntax to old code that older browser can understand
* `babel-preset-react`: transform react jsx to react.createElement()
* `babel-plugin-transform-object-rest-spread`: transform object using rest/spread operator

package.json:

```json
  "babel": {
    "presets": [
      "react",
      "env"
    ],
    "plugins": [
      "transform-object-rest-spread"
    ]
  },
```

**Use .babelrc**:

We have our babel config in package.json. It's better to extract it and put into .babelrc

```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins":[
		"transform-object-rest-spread"
	]
}
```

package.json

> babel-plugin-transform-object-rest-spread:
>
> spread i.e.: let { _id, label, ...rest } = task  // task is a object with property _id, label, etc
>
> spread i.e.: const { className, children, ...rest } = this.props
>
> rest i.e.: `function(...[a, b, c]) { return a + b + c; }`

```json
"devDependencies": {
  "babel-core": "^6.24.1",
  "babel-loader": "^7.0.0",
  "babel-preset-env": "^1.4.0",
  "babel-preset-react": "^6.24.1",
  "babel-plugin-transform-object-rest-spread": "^6.23.0"
  ...
}
```

### css-loader

any css file that contains import, url(..img) => require()

### Running Webpack

`npm start` will run `webpack-dev-server --open`, which will start running babel and react transform, cache result. So now "dist" folder is not showing. In production we will generate the dist folder. 