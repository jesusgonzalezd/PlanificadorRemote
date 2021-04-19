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
    res.sendFile(__dirname + '/graph_2.html');
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

var flag = true;

parser.on('data', function(data) {

    if(flag){
        data = data.slice(0, 0).concat(data.slice(1, data.length));
        flag = false;
    }

    var time = new Date();

    db.ref("arduinoMonitoreo").push({
        output: JSON.parse(data).output,
        output_2: JSON.parse(data).output_2,
        temperatura: JSON.parse(data).temperature,
        fecha: time.getDay() + "/" + time.getMonth() + "/" + time.getFullYear(), 
        tiempo: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    });
    
    //io.emit('arduino:data', data);
});

//Captura errores de lectura en puerto del arduino.
port.on('error', function(err){
    console.log(err);
});

