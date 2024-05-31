import express from "express";
import { publishMessage } from "./mqtt.js";
import { client } from "./getData.js"; // Importa el cliente MQTT desde getData.js

const app = express();
const port = 3000;

app.use(express.json());

// Ruta para enviar datos al broker MQTT
app.post("/sendData", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Mensaje no proporcionado" });
  }

  publishMessage(message);
  res.status(200).json({ message: "Mensaje enviado exitosamente al broker MQTT" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);

  // Ahora que el servidor está iniciado, el cliente MQTT también debería estar activo
  client.on('connect', () => {
    console.log('Cliente MQTT conectado');
  });

  client.on('error', (error) => {
    console.error('Error en el cliente MQTT:', error);
  });
});
