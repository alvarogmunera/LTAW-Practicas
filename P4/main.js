//-- Cargar el módulo de electron
const electron = require('electron');
//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');


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
  });