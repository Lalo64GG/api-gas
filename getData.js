import mqtt from "mqtt";

// Configuración del cliente MQTT
const brokerUrl = 'mqtt://broker.hivemq.com';  // URL del broker MQTT
const topic = 'arquitectura/salida';            // Tema del que recibirás los mensajes

// Crear un cliente MQTT
const client = mqtt.connect(brokerUrl);

// Manejadores de eventos del cliente MQTT
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  // Suscribirse al tema
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Error al suscribirse al tema:', err);
    } else {
      console.log('Suscrito al tema:', topic);
    }
  });
});

client.on('error', (error) => {
  console.error('Error de conexión al broker MQTT:', error);
  client.end();  // Cerrar la conexión con el broker MQTT
});

// Manejador de eventos para los mensajes recibidos
client.on('message', (topic, message) => {
  console.log('Mensaje recibido:', message.toString());
  // Puedes hacer cualquier procesamiento adicional aquí
});

// Exportar el cliente MQTT para que pueda ser utilizado en otras partes de la aplicación si es necesario
export { client };
