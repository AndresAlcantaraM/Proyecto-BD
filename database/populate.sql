-- Insertar datos en la tabla mensajero
INSERT INTO mensajero (identificacion, nombre, direccion, email, telefonoDeContacto, medioDeTransporte)
VALUES
(1, 'Juan Pérez', 'Calle 123, Ciudad A', 'juan.perez@example.com', '123456789', 'Moto'),
(2, 'María López', 'Av. Siempre Viva 742, Ciudad B', 'maria.lopez@example.com', '987654321', 'Bicicleta');

-- Insertar datos en la tabla cliente
INSERT INTO cliente (identificacion, nombre, direccion, email, telefonoDeContacto, ciudad)
VALUES
(1, 'Empresa XYZ', 'Calle Principal 456, Ciudad A', 'contacto@xyz.com', '111222333', 'Ciudad A'),
(2, 'Juan García', 'Calle Secundaria 789, Ciudad B', 'juan.garcia@example.com', '444555666', 'Ciudad B');

-- Insertar datos en la tabla mensajero_cliente
INSERT INTO mensajero_cliente (identificacion, mIdentificacion, cIdentificacion)
VALUES
(1, 1, 1),
(2, 2, 2);

-- Insertar datos en la tabla sucursal
INSERT INTO sucursal (nombre, direccion, telefonoDeContacto, cIdentificacion)
VALUES
('Sucursal Norte', 'Av. Norte 123, Ciudad A', '321654987', 1),
('Sucursal Sur', 'Calle Sur 456, Ciudad B', '789123456', 2);

-- Insertar datos en la tabla usuario
INSERT INTO usuario (login, contrasena, email, direccion, telefonoDeContacto, cIdentificacion)
VALUES
('user1', 'password1', 'user1@example.com', 'Calle 1, Ciudad A', '555666777', 1),
('user2', 'password2', 'user2@example.com', 'Calle 2, Ciudad B', '888999000', 2);

-- Insertar datos en la tabla estado
INSERT INTO estado (identificacion, estado, fechaYHoraDelEstado)
VALUES
(1, 'Recogido por el mensajero', '2024-05-21 10:00:00'),
(2, 'Entregado', '2024-05-21 12:00:00');

-- Insertar datos en la tabla servicio
INSERT INTO servicio (codigo, fechaYHoraDeSolicitud, origen, destino, descripcion, numeroDePaquetes, tipoDeTransporte, cIdentificacion, eIdentificacion)
VALUES
(1, '2024-05-21 09:00:00', 'Ciudad A', 'Ciudad B', 'Entrega de documentos', 1, 'Moto', 1, 1),
(2, '2024-05-21 11:00:00', 'Ciudad B', 'Ciudad A', 'Entrega de paquete', 2, 'Bicicleta', 2, 2);