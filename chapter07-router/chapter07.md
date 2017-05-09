# react-router-dom

Route exact means exactly match the path. Take `<Route exact path='/' component={Home} />` for example. If we navigate to _localhost/popular_, without exact keyword, Home component still matches this route.

```diff
// App.js
const React = require('react')
+ const ReactRouter = require('react-router-dom')
+ const Router = ReactRouter.BrowserRouter;
+ const Route = ReactRouter.Route;
+ const Switch = ReactRouter.Switch;

+ const Nav = require('./Nav')
+ const Home = require('./Home')
+ const Battle = require('./Battle')
const Popular = require('./Popular')

class App extends React.Component {
    render() {
        return (
+            <Router>
                <div className="container">
+                   <Nav />

+                   <Switch>
+                     <Route exact path='/' component={Home} />
+                     <Route exact path='/battle' component={Battle} />
+                     <Route path='/popular' component={Popular} />
+                     <Route render={() => <p>Not found</p>} />
+                   </Switch>
                </div>
+            </Router>
        )
    }
}

module.exports = App;
```

## NavLink and Link diff

We use NavLink in Nav.js. **NavLink** can add some classes or styles to the link while **Link** cannot. NavLink is composed of Link. Here, when we click the navbar, we want to bolden the font.

```jsx
const React = require('react')
const NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className="nav">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/battle">Battle</NavLink></li>
      <li><NavLink activeClassName="active" to="/popular">Popular</NavLink></li>
    </ul>
  )
}

module.exports = Nav;
```

Home.js uses Link:

```jsx
const React = require('react')
const Link = require('react-router-dom').Link

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Github Battle: Battle your friends ... and stuff.</h1>
        <Link className="button" to="/battle">Battle</Link>
      </div>
    )
  }
}

module.exports = Home;
```

# Avoiding refreshing not found

If we refresh page _localhost/popular_, you will see the page is not found, because our server tries to access folder popular which doesn't exist. So we include `publicPath` and `histroyApiFallback:true`. This means when we refresh and request _localhost/popular_, the server tries to request _localhost/_, and then react router works on _/popular_.

```diff
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
+    publicPath: '/'
  },
  devServer: {
+    historyApiFallback: true,
  },
  ...
};
```