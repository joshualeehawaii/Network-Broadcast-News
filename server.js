/*jshint esversion: 6*/
const net = require('net');

//Keeping track of the clinets
var clients = [];

//New server (0.0.0.0 and port 6969)
const server = net.createServer((socket) => {

  console.log('new client connection is made');

  //Identify this client
  socket.name = socket.remoteAddress;
  console.log(socket.name + ' joined the chat');

  //Add client to list
  clients.push(socket);

  //Data flowing to clients
  socket.on('data', (data) => {
    process.stdout.write(socket.name + ' : ' + data);
    clients.forEach((client) => {
      if (client === socket){
        return;
      } else {
        client.write(data);
      }
    });
  });
});

//Starting the server listening for connections
server.listen({host:'localhost', port: 6969}, () => {
  console.log('server listening to 6969');
});