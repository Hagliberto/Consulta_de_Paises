const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (request, response) {
  const filePath = '.' + request.url;
  const extname = path.extname(filePath);
  const contentType = extname === '.js' ? 'text/javascript' : 'text/html';

  response.setHeader('Content-Type', contentType);

  response.statusCode = 200;

  if (request.url === '/') {
    response.end(fs.readFileSync('./index.html'));
  } else if (request.url === '/favicon.ico') {
    response.statusCode = 204; // No Content
    response.end();
  } else {
    response.end(fs.readFileSync(filePath));
  }
});

server.listen(port);

console.log(`Servidor rodando em http://localhost:${port}`);