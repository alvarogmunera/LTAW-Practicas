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
   socket.send('<b> Hello! </b>' + "  "+  'Welcome to the best chat' + "  " + socket.id + "!" );
  
  socket.broadcast.emit('message', '<b> Great! </b>' + "  "+ "<i>" + socket.id  + "</i> " +'joins the chat. ');


    //-- Evento de desconexión
    socket.on('disconnect', function(){
        console.log('** CONEXIÓN TERMINADA **'.yellow);
        counter -= 1;
        socket.broadcast.emit('message', '<b> CIAO! </b>' + "  "+ "<i>" +  socket.id  + " </i> " + 'left the chat. ');
      }); 

        //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    if (msg.startsWith("/")) {
      console.log("Ojo, es un comando".orange);
        if (msg == "/help") {
            socket.send(
              "Commands:" 
            + "<br>"+ 
            '<b> / help </b>' + "   " + 'Will show a list with all supported spells'
            + "<br>"+ 
            '<b> / list </b>' + "   " + 'Will return the number of connected users'
            + "<br>"+ 
            '<b> / hello </b>' + "   " + "The server will return the hello message"
            + "<br>"+ 
            '<b> / date </b>' + "   " + "It will return the date");
        }else if (msg == "/list") {
            socket.send("Users in the chat: " + "<b>"+ counter + "</b>");
        }else if (msg == "/hello") {
            socket.send("Welcome!: "  + "<b> Nice to meet you! </b>");
        }else if (msg == "/date") {
            let now= new Date();
            console.log("date".green + 'La fecha actual es',now);
            socket.send("Today is:  <b>" + now + "</b>");
            
        }else{
          console.log("Enga".purple);
        }    
    }else{
      console.log("Mensaje Recibido!: " + socket.id + msg.blue);

      //-- Reenviarlo a todos los clientes conectados
      
      io.send("<b>" + socket.id + "</b> : "  + msg);
      
    }
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);