# Nodejs server-side rendering

Since we are not using client-side rendering, app/index.html template is no longer needed. Instead, we add server/views/index.ejs.

index.ejs:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Comatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, intial-scale=1">
  <title>
    <%- title %>
  </title>
  <link href="/build.css" rel="stylesheet">
</head>
<body>
  <%- body %>
  <script src="/index_bundle.js"></script>
</body>
</html>
```

express.js: `connect-history-api-fallback` is not needed for server rendering

```diff
const config = require('./config'),
  express = require('express'),
  // morgan = require('morgan'),
  // compress = require('compression'),
  // methodOverride = require('method-override'),
  // session = require('express-session');
  bodyParser = require('body-parser');

// Express middleware for single page apps with client side routing.
- const history = require('connect-history-api-fallback');

// Define the Express configuration method
module.exports = function (db) {
  // Create a new Express application instance
  var app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    // app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    // app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  // app.use(methodOverride());

  // // Configure the 'session' middleware
  // app.use(session({
  //   saveUninitialized: true,
  //   resave: true,
  //   secret: config.sessionSecret,
  //   store: mongoStore
  // }));

  // Set the application view engine and 'views' folder
+  app.set('views', './server/views');
+  app.set('view engine', 'ejs');

  // Load the routing files
+  require('../server/routers/app.server.router')(app);
  require('../server/routers/task.server.router')(app);

  // Configure static file serving
  app.use(express.static('./dist'));

  // Return the Server instance
  return app;
};
```

**The most important thing is to configure routes! Put all routes in array, so directly targeting these url or refreshing work well.**

app.server.router.js:

```javascript
module.exports = function (app) {
  app.get(['/', '/battle', '/popular', '/visualization', '/task'], (req, res) => {
    res.render('index', {
      title: "React Fundamental",
      body: "<div id='app'></div>"
    });
  });
};
```

