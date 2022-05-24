 # Práctica 3
***

 **MANUAL DE USUARIO**

 Para ejecutar la página web hemos de seguir los siguientes pasos:

 1. En un terminal: 
 > node chat-server.js 
 
 2. Ponemos la siguiente URL en nuestro navegador:
 > 127.0.0.1:9000

 A continuación, se le mostrará el chat, en el cual, si realiza el mismo proceso mencionado en otra ventana, podrá intercambiarse mensajes.

*Comandos especiales*:

* /help: el cual nos mostrará una lista con todos los comandos soportados
* /list: Devolverá el número de usuarios conectados
* /hello: El servidor nos devolverá el saludo
* /date: Nos devolverá la fecha

*Mejoras*

* Nickname de usuario. Cada ususario se le asigna un nickname al azar.
* Número de usuarios conectados
* Mensajes directos entre usuarios
* Sonidos cuando se reciben mensajes
***

**DOCUMENTACIÓN TÉCNICA**

El chat se despliega en el PUERTO 9000 de la direccion de IP local.

Para desplegar el chat es necesario importar los siguientes modulos:

* socket 
* http
* express
* colors
* snakeNames

Para instalar los modulos no incluidos utilizar *npm i*
***
**IMÁGENES**

![](https://github.com/alvarogmunera/LTAW-Practicas/blob/main/P3/wiki.jpg)