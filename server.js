var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);


io.sockets.on('connection',
  function(socket) {
    console.log('new connection: ' + socket.id);


    socket.on('start',function() {
        socket.emit('started',socket.id);
      });


    socket.on('foodData',function(data) {
        // console.log('foodData : ' + data.x + ' ' + data.y);
        socket.broadcast.emit('foodDataServer',data);
      });



    socket.on('snakeData',function(prev,head,dir,id) {
        var inList = false;
        for(var i = 0;i < allSneks.length;i++) {
          let temp = allSneks[i];
          if(temp.id == id) {
            allSneks[i] = {
              prev: prev,
              head: head,
              dir: dir,
              id: id
            };
            inList = true;
          }
        }
        if(!inList) {
          let temp = {
            prev: prev,
            head: head,
            dir: dir,
            id: id
          };
          allSneks.push(temp);
        }
        socket.broadcast.emit('snakeDataServer',prev,head,dir,id);
      });


});

var allSneks = [];
