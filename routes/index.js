var express = require('express');
var router = express.Router();

module.exports = (io) => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  io.on("connection", (socket) => {
    console.log("User has Connected", socket.id);

    socket.on("send_message", (data) => {
      // to all clients in room1 except the sender
      // socket.to(data.roomId).emit("receive_message", data);

      console.log("RECEIVED", data);
      // to all clients in room
      io.in(data.roomId).emit("receive_message", data);
    });

    socket.on("join_room", (data) => {
      console.log("ROOM", data);
      socket.join(data);
    });

    socket.on("disconnecting", () => {
      console.log('DISCONNECTING', socket.rooms); 
    });
  
    socket.on("disconnect", (reason) => {
      console.log(reason); // "ping timeout"
    });

  });

  return router;
};
