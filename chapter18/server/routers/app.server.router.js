module.exports = function (app) {
  app.get(['/', '/battle', '/popular', '/visualization', '/task'], (req, res) => {
    res.render('index', {
      title: "React Fundamental",
      body: "<div id='app'></div>"
    });
  });
};
