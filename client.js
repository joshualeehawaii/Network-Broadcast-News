/*jshint esversion: 6*/
const net = require('net');

//Connect client to server
const client = net.createConnection({port: 6969, host: '0.0.0.0'}, () => {
  console.log('connected to server');

});

client.on('connect', () => {
  process.stdin.pipe(client);
});

client.on('data', (data) => {
  process.stdout.write(data);
});