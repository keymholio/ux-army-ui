var gzippo = require('gzippo');
var express = require('express');

var app = express.createServer(express.logger());
app.use(gzippo.staticGzip(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);

app.use forceSsl(req, res, next)
    if req.header 'x-forwarded-proto' != 'https'
      res.redirect "https://#{req.header 'host'}#{req.url}"
    else
      next()