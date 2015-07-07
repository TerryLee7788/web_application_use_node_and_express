var http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode, {'Content-Type': contentType});
      res.end(data);
    }
  });
}

http.createServer(function (req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '':
      // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.end('Home page');
      serveStaticFile(res, '/public/index.html', 'text/html');
      console.log('home page')
      break;
    case '/about':
      // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.end('About page');
      serveStaticFile(res, '/public/about.html', 'text/html');
      console.log('about page')
      break;
    default:
      // res.writeHead(404, {'Content-Type': 'text/plain'});
      // res.end('Not Found');
      serveStaticFile(res, '/public/404.html', 'text/html');
      // console.log('not found')
      break;
  }

}).listen(3000);

console.log('web application is working on localhost:3000, press CTRL+C to stop the server.');