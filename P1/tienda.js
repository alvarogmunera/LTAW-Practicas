//-- Importar el módulo HTTP
const http = require('http');
//-- Importar el módulo FS
const fs = require('fs');

const PUERTO = 9000;

//-- Creo el servidor
const server = http.createServer(function(req, res) {
    //-- Petición recibida
    console.log('\nPetición recibida');

    //-- Se obtiene la URL del recurso
    let url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL del recurso solicitado: " + url.href);

    //-- Fichero del recurso
    let recurso = "";

    //-- Analizo recurso, si es raiz --> pag principal
    if(url.pathname == '/') { 
      recurso += "/tienda.html" 
    } else { 
      recurso = url.pathname;
    }

    //-- Extensión del recurso
    extension = recurso.split(".")[1];
    recurso = '.' + recurso;
    console.log(' * Recurso solicitado: ' + recurso);
    console.log(' * Extensión del recurso solicitado: ' + extension);

      //-- Tipos de mime
    const type_mime = {
        "jpg" : "image/jpg",
        "html" : "text/html",
        "ico" : "image/ico",
        "css" : "text/css",
        "jpeg" : "image/jpeg",
        "gif" : "image/gif",
        "png" : "image/png",
    }; 

    let mime = type_mime[extension];
    console.log(' * Tipo de MIME: ' + mime);

      //-- Lectura asincrona del fichero
    fs.readFile(file, (err,data) => {

    //-- Fichero no encontrado, página de error
    if (err) {

        // Cabecera de error
        res.writeHead(404, {'Content-Type': 'text/html'});
        console.log('\n404: Not Found');
        file = './error.html';
        data = fs.readFileSync(file);
        res.write(data);
        res.end();

    }else{
      
        //-- Cabecera de ok
        res.writeHead(200, {'Content-Type': mime});
        console.log('\n200: OK');

        //-- Recurso solicitado
        res.write(data);
        res.end();
    }
  });
});

//-- Activo el servidor
server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO + '\n');