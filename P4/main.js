//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    let path = __dirname + '/public/chat.html';
    res.sendFile(path);
    console.log("Acceso a " + path);
  });