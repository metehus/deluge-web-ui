var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var deluge = require('./deluge.js');

/*
deluge.login(function(cookie) {
  deluge.getTorrents(cookie, function(t){
    console.log(t.data)
  })
});*/

io.on('connection', function(socket){
  
  deluge.login(function(cookie) {
    deluge.connect(cookie, function(){
      deluge.getTorrents(cookie, function(t){
        io.emit('setup', t.data);
      })
      setInterval(function(){
        deluge.getTorrents(cookie, function(t){
          io.emit('status', t.data);
        })
      }, 700);
    })
    
  });
});



app.use(express.static(__dirname + '/public'));

http.listen(9966, function () {
  console.log('Example app listening on port 9966!');
});
