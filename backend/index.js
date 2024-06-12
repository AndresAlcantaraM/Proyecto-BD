const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Pool = require('pg-pool');

// Configuración de la base de datos
const config = {
    user: "postgres",
    database: "postgres",
    password: "pg123",
    host: "192.168.1.6",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
});

function connect(callback) {
    return pool.connect(callback);
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Cambiado a '..' para servir archivos estáticos desde la carpeta frontend

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.post('/addClient', (req, res) => {
    const { id, name, address, city, email, phone } = req.body;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO cliente (identificacion, nombre, direccion, ciudad, email, telefonoDeContacto) VALUES ($1, $2, $3, $4, $5, $6)', 
                     [id, name, address, city, email, phone], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('Client added');
                     });
    });
});

// Similar routes for addCourier, addService, addUser
app.post('/addCourier', (req, res) => {
    const { id, name, address, email, phone, transport } = req.body;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO mensajero (identificacion, nombre, direccion, email, telefonoDeContacto, medioDeTransporte) VALUES ($1, $2, $3, $4, $5, $6)', 
                     [id, name, address, email, phone, transport], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('Courier added');
                     });
    });
});

app.post('/addService', (req, res) => {
    const { code, date, time, origin, destination, city, description, transport, packages } = req.body;
    const timestamp = `${date} ${time}`;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO servicio (codigo, fechaYHoraDeSolicitud, origen, destino, descripcion, numeroDePaquetes, tipoDeTransporte, cIdentificacion, eIdentificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, NULL, NULL)', 
                     [code, timestamp, origin, destination, description, packages, transport], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('Service added');
                     });
    });
});

app.post('/addUser', (req, res) => {
    const { login, password, address, email, phone } = req.body;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO usuario (login, contrasena, direccion, email, telefonoDeContacto, cIdentificacion) VALUES ($1, $2, $3, $4, $5, NULL)', 
                     [login, password, address, email, phone], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('User added');
                     });
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

