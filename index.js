const express = require('express');
const app = express();
const rootRouter = require('./routes/welcome');
const articleRouter = require('./routes/article');
const path = require('path');

app.set('port', process.env.PORT || 3002);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);


app.use('', rootRouter);
app.use('', articleRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;
