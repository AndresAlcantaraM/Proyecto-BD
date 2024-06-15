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
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await pool.query(
            'SELECT * FROM usuario WHERE login = $1 AND contrasena = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.status(200).json({ message: 'Login successful', role: user.rol });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Internal server error');
    }
});

// Rutas para registrar cliente, mensajero, servicio y usuario
app.post('/addClient', (req, res) => {
    const { id, name, address, city, email, phone } = req.body;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO cliente (identificacion, nombre, direccion, ciudad, email, telefonoDeContacto) VALUES ($1, $2, $3, $4, $5, $6)', 
                     [id, name, address, city, email, phone], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('Cliente añadido');
                     });
    });
});

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
    
    const queryDate = new Date().toLocaleString("en-US", {timeZone: "America/Bogota"});
    
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);

        const query = `
            INSERT INTO servicio 
            (codigo, fechaYHoraDeSolicitud, origen, destino, descripcion, numeroDePaquetes, tipoDeTransporte, estado, fechaYHoraDelEstado, cIdentificacion) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL)
        `;
        const values = [code, timestamp, origin, destination, description, packages, transport, 'Solicitado', queryDate];

        client.query(query, values, (err) => {
            done();
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send('Service added');
        });
    });
});

app.post('/addUser', (req, res) => {
    const { login, password, address, email, phone, role} = req.body;
    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);
        client.query('INSERT INTO usuario (rol, login, contrasena, direccion, email, telefonoDeContacto, cIdentificacion) VALUES ($1, $2, $3, $4, $5, $6, NULL)', 
                     [role, login, password, address, email, phone], 
                     (err) => {
                         done();
                         if (err) return res.status(500).send(err.message);
                         res.status(200).send('User added');
                     });
    });
});

app.post('/modifyService', async (req, res) => {
    const { codeS, status } = req.body;
    const queryDate = new Date().toLocaleString("en-US", {timeZone: "America/Bogota"});

    connect((err, client, done) => {
        if (err) return res.status(500).send(err.message);

        const query = `
            UPDATE servicio 
            SET estado = $1, fechaYHoraDelEstado = $2
            WHERE codigo = $3
        `;
        const values = [status, queryDate, codeS];

        client.query(query, values, (err) => {
            done();
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send('Servicio modificado');
        });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
