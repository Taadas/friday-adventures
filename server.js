var express = require('express');
var app = express();
var http = require('http').Server(app);

const port = 3000;

app.use(express.static(__dirname));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

http.listen(port, function(){
  console.log('listening to requests');
});
