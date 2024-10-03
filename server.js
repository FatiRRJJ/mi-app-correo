const express = require('express');
const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Puedes cambiar el puerto

app.use(cors());
app.use(bodyParser.json()); 

// Configura el transportador de nodemailer (usa tu servicio de correo preferido)
const transporter = nodemailer.createTransport({
    service: 'gmail', //  o 'outlook', 'yahoo', etc.
    auth: {
        user: 'jaquezdesiree150@gmail.com', 
        pass: 'ripx ddaw ksom cvas'  
    }
});

app.post('/enviar-correo', (req, res) => {
    const { destinatario, mensaje, clave } = req.body;

    // Encriptar el mensaje
    const mensajeEncriptado = CryptoJS.AES.encrypt(mensaje, clave).toString();

    const mailOptions = {
        from: 'jaquezdesiree150@gmail.com',
        to: destinatario,
        subject: 'Tienes un mensaje encriptado',
        html: `
            <p>Hey!, tengo algo para ti, necesito que accedas al sistema:</p>
            <p><b>Clave:</b> ${clave}</p>
            <p><b>Contenido del mensaje:</b> ${mensajeEncriptado}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.send('Correo electrónico enviado correctamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});