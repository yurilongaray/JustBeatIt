var express = require('express');
var app     = express();


const prices = app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)