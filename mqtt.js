import mqtt from "mqtt";

// Configuración del cliente MQTT
const brokerUrl = 'mqtt://broker.hivemq.com';  // URL del broker MQTT
const topic = 'arquitectura/salida';            // Tema al que enviarás los mensajes

// Crear un cliente MQTT
const client = mqtt.connect(brokerUrl);

// Manejadores de eventos del cliente MQTT
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
});

client.on('error', (error) => {
  console.error('Error de conexión al broker MQTT:', error);
  client.end();  // Cerrar la conexión con el broker MQTT
});

// Función para publicar un mensaje en el broker MQTT
function publishMessage(message) {
  client.publish(topic, message, (error) => {
    if (error) {
      console.error('Error al publicar el mensaje:', error);
    } else {
      console.log('Mensaje publicado:', message);
    }
  });
}

// Exportar la función de publicación
export { publishMessage };
