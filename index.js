import express from "express";
import http from "http";
import { Server } from "socket.io";
import { publishMessage } from "./mqtt.js";
import { client } from "./getData.js"; // Importa el cliente MQTT desde getData.js

const app = express();
const port = 3000;

// Crear servidor HTTP y Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Permitir todas las conexiones de cualquier origen (modificar según sea necesario)
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// Ruta para enviar datos al broker MQTT
app.post("/sendData", (req, res) => {
  const { message } = req.body;
  console.log(message);

  message.toString()

  if (!message) {
    return res.status(400).json({ error: "Mensaje no proporcionado" });
  }

  publishMessage(message);
  res.status(200).json({ message: "Mensaje enviado exitosamente al broker MQTT" });
});

// Iniciar el servidor HTTP y Socket.io
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Conectar el cliente MQTT y manejar los eventos
client.on('connect', () => {
  console.log('Cliente MQTT conectado');

  const topic = 'arquitectura/salida';  // Tema del que recibirás los mensajes
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Error al suscribirse al tema:', err);
    } else {
      console.log('Suscrito al tema:', topic);
    }
  });
});

client.on('error', (error) => {
  console.error('Error en el cliente MQTT:', error);
  client.end();  // Cerrar la conexión con el broker MQTT
});

// Manejador de eventos para los mensajes recibidos
client.on('message', (topic, message) => {
  console.log('Mensaje recibido:', message.toString());
  // Enviar el mensaje recibido a todos los clientes conectados mediante Socket.io
  io.emit('mqtt_message', message.toString());
});
