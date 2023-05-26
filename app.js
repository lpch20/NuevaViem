const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración del middleware bodyParser para analizar el cuerpo de la solicitud como JSON
app.use(bodyParser.json());
app.use(cors());

// Ruta para enviar el token al número de celular
app.post('/enviar-token', (req, res) => {
  const celular = req.body.celular;

  // Reemplaza los valores con tu SID de cuenta y token de autenticación de Twilio
  const accountSid = 'AC07e05daf83d07163fa24797fc1f5b9ee';
  const authToken = '2cf3f875e29e7894f0eea8c73ff25628';

  // Reemplaza con tu número de teléfono de Twilio
  const twilioNumber = '+13159292208';

  // Mensaje con el token a enviar
  const mensaje = 'Aquí va tu mensaje con el token';

  // Importa el módulo 'twilio' (asegúrate de haberlo instalado previamente con npm install twilio)
  const twilio = require('twilio');
  const client = new twilio(accountSid, authToken);

  // Envía el mensaje utilizando la API de Twilio
  client.messages
    .create({
      body: mensaje,
      from: twilioNumber,
      to: celular
    })
    .then(message => {
      console.log(message.sid);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Resto del código de tu servidor...

// Inicia el servidor en el puerto deseado
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});