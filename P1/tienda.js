//-- Definiciones de modulos
const http = require('http');
const fs = require('fs');
const url = require('url');

//-- Definiciones del puerto
const PUERTO = 9090;

//-- Creo el servidor
const server = http.createServer(function(req, res) {
    //-- Petición recibida
    console.log('\nPetición recibida');

    //-- Se obtiene la URL del recurso
    let url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL del recurso solicitado: " + url.href);
    console.log(" * Ruta: " + myURL.pathname);

    //-- Fichero del recurso
    let recurso = "";

    //-- Analizo recurso, si es raiz --> pag principal
    if(url.pathname == '/') { 
      recurso += "/tienda.html" 
    } else { 
      recurso = url.pathname;
    }