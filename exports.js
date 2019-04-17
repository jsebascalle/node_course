const http = require('http');
const fs = require('fs');
const parser = require('./params_parser.js');
const render = require('./render_view.js');


http.createServer(function(req,res) {
  if(req.url.indexOf('favicon.ico') > 0) return;
  fs.readFile('./index.html',function(err,html) {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(render.render(html.toString(),parser.parse(req)));
    res.end();
  });
}).listen(3000);