//-- Cargar el módulo de electron
const electron = require('electron');
//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const snakeNames = require('snake-names');
const ip = require('ip');
const PUERTO = 9000;

//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    let path = __dirname + '/public/chat.html';
    res.sendFile(path);
    console.log("Acceso a " + path);
  });

//-- Servidor envía al cliente la biblioteca socket.io
app.use('/', express.static(__dirname +'/'));
app.use(express.static('public'));

//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
    console.log('** NUEVA CONEXIÓN **'.yellow + socket.id);
  
     //-- Le damos la bienvenida a través del evento 'hello'
     counter += 1;
      //-- Enviar numero de usuarios al renderer
    win.webContents.send('users', counter);
     socket.id =  snakeNames.random() ;
     socket.send('<b> APARECIUM! </b>' + "  "+  'Welcome to magic chat' + "  " + socket.id + "!" );
     win.webContents.send('msg_client', '<b> APARECIUM! </b>' + "  "+  'Welcome to magic chat' + "  " + socket.id + "!" );
    
       //-- Enviar mensaje de nuevo usuario a todos los usuarios
    io.send( '<b> ALOHOMORA! </b>' + "  "+ "<i>" + socket.id  + "</i> " +'joins the chat. ');
  
    //-- Enviar al render mensaje de conexion
    win.webContents.send('msg_client', '<b> ALOHOMORA! </b>' + "  "+ "<i>" + socket.id  + "</i> " +'joins the chat. ');
  
    //-- Evento de desconexión
    socket.on('disconnect', function(){
      console.log('** CONEXIÓN TERMINADA **'.yellow);
      counter -= 1;
      win.webContents.send('users', counter);
  
          //-- Enviar mensaje de desconexión de usuario a todos los usuarios
          io.send( '<b> EVANESCO! </b>' + "  "+ "<i>" +  socket.id  + " </i> " + 'left the chat. ');
  
          //-- Enviar al render mensaje de desconexion
          win.webContents.send('msg_client', '<b> EVANESCO! </b>' + "  "+ "<i>" +  socket.id  + " </i> " + 'left the chat. ');
    });  
  
  
    //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
    socket.on("message", (msg)=> {
      //-- Enviar al render
      win.webContents.send('msg_client', socket.id + ': '  + msg);
      if (msg.startsWith("/")) {
        console.log("Ojo, es un comando".orange);
          if (msg == "/help") {
              socket.send(
                "Commands:" 
              + "<br>"+ 
              '<b> / help </b>' + "   " + 'Will show a list with all supported spells'
              + "<br>"+ 
              '<b> / list </b>' + "   " + 'Will return the number of connected magicians'
              + "<br>"+ 
              '<b> / hello </b>' + "   " + "The server will return the magic greeting"
              + "<br>"+ 
              '<b> / date </b>' + "   " + "It will return the date");
          }else if (msg == "/list") {
              socket.send("Magicians in the chat: " + "<b>"+ counter + "</b>");
          }else if (msg == "/hello") {
              socket.send("Welcome! Like Hagrid told Harry: "  + "<b> You are a wizard </b>");
          }else if (msg == "/date") {
              let now= new Date();
              console.log("date".green + 'La fecha actual es',now);
              socket.send("Today is:  <b>" + now + "</b>");
              
          }else{
            console.log("Out muggle".purple);
          }    
      }else{
        console.log("Mensaje Recibido!: " + socket.id + msg.blue);
  
        //-- Reenviarlo a todos los clientes conectados
        
        io.send("<b>" + socket.id + "</b> : "  + msg);
        
      }
    });
  
  });

//-- Lanzar el servidor HTTP
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

console.log("Arrancando electron...");
//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 1000,   //-- Anchura 
        height: 850,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  win.loadFile("chat_electron.html");

  win.on('ready-to-show', () => {
    win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
  });
});

//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
    io.send(msg);
    win.webContents.send('msg', msg);
  });