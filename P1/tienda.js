const http = require('http');
const fs = require('fs');
const url = require('url');

const PUERTO = 9090;

const server = http.createServer(function(req, res) {
    console.log('\nPetición recibida');

    let url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL del recurso solicitado: " + url.href);
    console.log(" * Ruta: " + myURL.pathname);