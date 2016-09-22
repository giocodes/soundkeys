var express = require('express');
var app = express();
var path = require('path');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!', Date() );
});