// EXPRESS
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const db = require('../database/firebaseConfig');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Funcion para saber si un nuevo cliente se ha conectado.
io.on('connection', function(socket){
    console.log('Nuevo socket conectado');
});

//Función para añadir recursos
app.use(express.static(__dirname+'/'));

// Funcion para enviar una peticion http get al servidor con la vista index.
app.get('/', (req, res) =>{ 
    res.sendFile(__dirname + '/index.html');
});

// Funcion de escucha del servidor en port 3000.
server.listen(3000, function (){
    console.log("Servidor Escuchando en Puerto", 3000);
});

// Comunicacion Serial.
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

// Inicializa el puerto de comunicacion con arduino.
const port = new Serialport('COM9', {
    baudRate: 9600
});

// Delimita las lecturas de las salidas del arduino.
const parser = port.pipe(new Readline({ delimeter: '\r\n'}));

// Establece la conexion con arduino.
parser.on('open', function(){
    console.log("Conexion abierta");
});

// Obtiene datos de las salidas del arduino.
parser.on('data', function(data) {
    db.push({
        output:data.toString(),
        output_2:data.toString(),
        temperatura: 35,
    });

    io.emit('arduino:data', data);
});

//Captura errores de lectura en puerto del arduino.
port.on('error', function(err){
    console.log(err);
});

