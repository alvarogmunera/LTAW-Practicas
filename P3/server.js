//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const snakeNames = require('snake-names');

const PUERTO = 9000;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al server htto
const io = socket(server);

let counter = 0;


app.get('/', (req, res) => {
    let path = __dirname + '/chat.html';
    res.sendFile(path);
    console.log("Acceso a " + path);
  });

app.use('/', express.static(__dirname +'/'));


io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow + socket.id);


   counter += 1;
   socket.id =  snakeNames.random() ;
   socket.send('<b> APARECIUM! </b>' + "  "+  'Welcome to magic chat' + "  " + socket.id + "!" );
  
  socket.broadcast.emit('message', '<b> ALOHOMORA! </b>' + "  "+ "<i>" + socket.id  + "</i> " +'joins the chat. ');


    //-- Evento de desconexión
    socket.on('disconnect', function(){
        console.log('** CONEXIÓN TERMINADA **'.yellow);
        counter -= 1;
        socket.broadcast.emit('message', '<b> EVANESCO! </b>' + "  "+ "<i>" +  socket.id  + " </i> " + 'left the chat. ');
      }); 