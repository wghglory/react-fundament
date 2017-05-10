# Introduct bootstrap 4

Bootstrap 4 is built by Scss rather than Less!

## Create bootstrap folder under app

* _core.scss is copied partially form `node_modules/bootstrap.scss`
* _variables.scss is copied fomr `node_modules/bootstrap`
* jumbotron.scss is created and import _core.scss

## Use these scss and custom scss

Entry file -- index.js:

```jsx
// bootstrap core 
import './bootstrap/_core.scss';
// import './bootstrap/jumbotron.scss';  //question: jumbotron.scss internally import _core.scss, how to avoid duplicate?

// custom css overrides bootstrap
require('./index.css');
require('./index.scss');
```

## Issue

1. I don't want jumbotron.scss to be imported in index.js
1. Also, I don't want it is included in _core.scss
1. I want it to be imported only in the component needed

But if I do that, 

1. `@import "./core";` cannot be deleted in order to make `@import "../../node_modules/bootstrap/scss/jumbotron";` works
1. Since `@import "./core"` seems a must, it will override the index.scss

Last, I don't want _core.scss duplicates in build.css. Not sure how webpack handle scss duplicates. 

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