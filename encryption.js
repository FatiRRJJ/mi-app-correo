function encryptMessage() {
        const message = document.getElementById('message').value;
        const key = document.getElementById('key').value;
    
        if (!message || !key) {
            alert("El mensaje y la clave son requeridos.");
            return;
        }
    
        const encrypted = CryptoJS.AES.encrypt(message, key).toString();
        document.getElementById('result').value = encrypted;

    const destinatario = document.getElementById('destinatario').value;

    // Enviar datos al servidor
    fetch('http://localhost:3001/enviar-correo', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            destinatario: destinatario,
            mensaje: message, 
            clave: key 
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Muestra la respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el correo');
    });

    }
    
    function decryptMessage() {
        const encryptedMessage = document.getElementById('result').value;
        const key = document.getElementById('key').value;
    
        if (!encryptedMessage || !key) {
            alert("El mensaje encriptado y la clave son requeridos.");
            return;
        }
    
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
        const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);
    
        if (!originalMessage) {
            alert("Clave incorrecta o mensaje dañado.");
        } else {
            document.getElementById('message').value = originalMessage;
        }
    }