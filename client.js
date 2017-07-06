/*jshint esversion: 6*/
const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

//* STEP 1: USERNAME REGISTRSTION *

var username = '';
var invalidUsernames = ['[ADMIN]', 'ADMIN'];

//User must start by adding a username
getUsername();

function getUsername(){
  rl.question('Enter a username :', (answer) => {
    if (invalidUsernames.indexOf(answer) > -1) {
      console.log('Invalid name, try again');
      getUsername();
    } else {
      console.log('Thank You', answer);
      username += answer;
      rl.close();
      process.stdin.resume();
      connectToServer(answer);
    }
  });
}

//* STEP 2: CONNECT CLIENT TO CHAT *
function connectToServer(answer){
  //Connect client to server
  const client = net.createConnection({port: 6969, host: '0.0.0.0'}, () => {
  });
  //data in
  client.write(answer + ' has joined the chat' + '\n');

  client.on('connect', () => {
   process.stdin.pipe(client);
  });
  //data out
  client.on('data', (data) => {
   process.stdout.write(data);
 });
}