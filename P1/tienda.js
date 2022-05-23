//-- Importar el módulo HTTP
const http = require('http');
//-- Importar el módulo FS
const fs = require('fs');

const PUERTO = 9000;

const type = {
  "plain": "text/plain",
  "html": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "gif": "image/gif",
  "jpg": "image/jpg",
  "png": "image/png",
  "mp3": "audio/mpeg3"
};

const folder = ['CSS', 'Imagenes', 'JS'];


const server = http.createServer((req, res)=>{
  console.log("Petición recibida!");

  //-- Valores de la respuesta por defecto
  let code = 200;
  let code_msg = "OK";
  let path = "./front-end";
  let content_type = "text/html";
  let folder_exists = false;
}


//-- Activo el servidor
server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO + '\n');