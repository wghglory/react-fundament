# Introduct bootstrap 4

Bootstrap 4 is built by Scss rather than Less! I don't want to import the whole bootstrap. In this chapter, I want to use bootstrap button and jumbotron. Let's see we're gonna achieve this feature.

## 1. Create bootstrap folder under app

* _core.scss is copied partially form `node_modules/bootstrap.scss`
* jumbotron.scss is created and import "variables" and "mixins"

## 2. Use these scss and custom scss

Entry file -- index.js:

```jsx
// bootstrap core. specific plugin like jumbotron is imported in needed component.
import './bootstrap/_core.scss';

// custom css below bootstrap
require('./index.css');
require('./index.scss');
```

## 3. Import bootstrap specific scss for specific component

App/Home.js import bootstrap jumbotron.css

```javascript
import '../bootstrap/jumbotron.scss';
```

**The good things above**:

1. each component can have its own scss files
1. bootstrap core styles are overrided by our custom css
1. component's bootstrap scss won't conflicts with our custom css, although they load later than custom css

## Remove duplicate css

> One more issue: you may notice that jumbotron, _core.scss both have some `variables` and `mixins` duplicates. Someday we may need a alert.scss, which also have these. To remove duplicates, install `optimize-css-assets-webpack-plugin`

in webpack.production.config.js

```javascript
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //remove duplicates

plugins: [
    ...
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
```

Now, there should be no duplicate css.

# Use ES6 import instead CommonJS require

Take Home.js for ie: `export default` and remove `module.exports = Home`

```javascript
const React = require('react');
const Link = require('react-router-dom').Link;

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container jumbotron">
        <h1>Github Battle: Battle your friends ... and stuff.</h1>
        <Link className="button" to="/battle">Battle</Link>
      </div>
    );
  }
}
```

Now in App.js

```diff
- const Home = require('./Home');
+ import Home from './Home';
```

# Animation

* Native css3 animation for h1 with className animation.
* animation for Battle Link by react-addons-css-transition-group

Home.js

```diff
const React = require('react');
const Link = require('react-router-dom').Link;
+ import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container jumbotron">
+       <h1 className="animation">Github Battle: Battle your friends. h1: native css3 animation; button: react-addons-css-transition-group.</h1>
+       <ReactCSSTransitionGroup transitionName="animation" transitionAppear={true} transitionAppearTimeout={2000}
+          transitionEnterTimeout={2000} transitionLeaveTimeout={500}>
          <Link className="button" to="/battle">Battle</Link>
+       </ReactCSSTransitionGroup>
      </div>
    );
  }
}
```

index.scss

```scss
// native css3 animation
.animation {
  animation: h1animation 2s;
}

@keyframes h1animation {
  0% {
    transform: scale(0.5);
    color: $red;
  }
  100% {
    transform: scale(1);
    color: $buttonBackground;
  }
}

// react-addons-css-transition-group animation
.animation-appear {
  opacity: 0.01;
  transform: scale(0.5);
  color: $red;
  &.animation-appear-active {
    opacity: 1;
    color: $buttonBackground;
    transform: scale(1);
    transition: all 2s ease-in;
  }
}

.animation-enter {
  opacity: 0.01;
  &-active {
    opacity: 1;
    transform: scale(0.5);
    transition: all 2s ease-in;
  }
}

.animation-leave {
  opacity: 1;
  &-active {
    opacity: 0;
    transform: scale(1);
    transition: all .5s ease-out;
  }
}
```

# Webpack dev, production 2 files

1. create a webpack.production.config.js
2. package.json scripts: `"build": "NODE_ENV='production' webpack --config ./webpack.production.config.js -p",`

Now when you build for production, css name can be changed like "build.min.css"