// Create web server
// 1. Include http module
// 2. Create server
// 3. Listen to port 3000
// 4. Respond with "Hello World" for requests that hit the root URL
// 5. Listen for requests on all other URLs and respond with a 404
// 6. Log requests to the console
// 7. Start the server
// 8. Respond with a JSON object for requests to /comments
// 9. Log the request body to the console
// 10. Respond with a 201 status code

// 1. Include http module
var http = require('http');
var url = require('url');

// 2. Create server
var server = http.createServer(function(request, response) {
  // 6. Log requests to the console
  console.log('Request received: ' + request.url);

  // 8. Respond with a JSON object for requests to /comments
  if (request.method === 'GET' && request.url === '/comments') {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify({comment: 'This is a comment'}));
  }

  // 9. Log the request body to the console
  if (request.method === 'POST' && request.url === '/comments') {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk.toString();
    });
    request.on('end', function() {
      console.log('Request body: ' + body);
    });
    response.writeHead(201);
    response.end();
  }

  // 4. Respond with "Hello World" for requests that hit the root URL
  if (request.url === '/') {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end('Hello World\n');
  } else {
    // 5. Listen for requests on all other URLs and respond with a 404
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end('404 Not Found\n');
  }
});

// 3. Listen to port 3000
server.listen(3000);

// 7. Start the server
console.log('Server running at http://