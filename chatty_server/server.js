// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let user = 0;
let data = {type: 'userNew', user: ''}
let clients = [];

function generatecolor(){
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;

}

function broadcast(data, color) {
  let message = JSON.parse(data)
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      message.id = uuid.v1();
      if (message.type === 'chatty'){
        message.color = color;
      }
      if (message.type === 'userNew' && user === 1){
        message.user = `${user} user online`;

      } else if (message.type === 'userNew' && user > 1) {
        message.user = `${user} users online`
      }
      console.log('Broadcast', message)
      client.send(JSON.stringify(message));
    }
  });
}



wss.on('connection', function connection(ws) {
  console.log('Client Connected');
  user++;
  data.user = user;
  broadcast(JSON.stringify(data));
  clients.push(ws);
  let color = generatecolor();
  ws.on('message', function incoming(message) {
    broadcast(message, color);
  });

// ws.send('something');
  ws.on('close', () => {
    user--;
    userID = user;
    data.user = user;
    broadcast(JSON.stringify(data));
    console.log('Client disconnected')
  });
});


