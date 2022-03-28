const http = require('http');
const fs = require('fs');

console.log("Arrancando servidor...")


http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/') {
        console.log('init');

        fs.readFile('tienda.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            console.log("---> Peticion recibida")
            console.log("Recurso solicitado (URL): " + req.url)
            res.end(data)
        })
    }
}