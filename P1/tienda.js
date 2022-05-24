//-- Importar el módulo HTTP
const http = require('http');
//-- Importar el módulo FS
const fs = require('fs');
const path = require('path');

const PUERTO = 9090;

const server = http.createServer(function(req,res) {
  let myurl = new URL(req.url, "http://" + req.headers["host"]);
  let path = "";
  if(myurl.pathname == "/"){
    path += "/tienda.html";
  }else{
    path = myurl.pathname;
  }
  

file_extension = path.split(".")[1];
path = "." + path;
const type = {
  "plain": "text/plain",
  "html": "text/html",
  "css": "text/css",
  "jpg": "image/jpg",
  "png": "image/png",
};

    let mime = type[file_extension];

    fs.readFile(path, function (err, data) {
        if(err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          console.log("404 Not Found");
          path = "front-end/error404.html";
          data = fs.readFileSync(path);
        }else {
          res.writeHead(200, {'Content-Type': mime});
          console.log("Recurso recibido: " + mime);
          console.log("200 OK")
        }
        res.write(data);
        res.end();
      });
    });  
server.listen(PUERTO);

console.log("Servidor de la tienda funcionando. Escuchando en puerto: " + PUERTO);