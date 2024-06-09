CREATE TABLE mensajero(
	identificacion INT PRIMARY KEY,
	nombre VARCHAR(100) ,
	direccion VARCHAR(100),
	email VARCHAR(100) ,
	telefonoDeContacto VARCHAR(100),
	medioDeTransporte VARCHAR(100)
);

CREATE TABLE cliente(
	identificacion INT PRIMARY KEY,
	nombre VARCHAR(100) ,
	direccion VARCHAR(100),
	email VARCHAR(100) ,
	telefonoDeContacto VARCHAR(100),
	ciudad VARCHAR(100)
);

CREATE TABLE mensajero_cliente(
	identificacion INT PRIMARY KEY,
	mIdentificacion INT,
	cIdentificacion INT, 
	FOREIGN KEY(mIdentificacion) REFERENCES mensajero(identificacion),
	FOREIGN KEY(cIdentificacion) REFERENCES cliente(identificacion)
);

CREATE TABLE sucursal(
	nombre VARCHAR(100) ,
	direccion VARCHAR(100),
	telefonoDeContacto VARCHAR(100),
	cIdentificacion INT,
	FOREIGN KEY(cIdentificacion) REFERENCES cliente(identificacion)
);

CREATE TABLE usuario(
	login VARCHAR(100) ,
	contrasena VARCHAR(100),
	email VARCHAR(100),
	direccion VARCHAR(100),
	telefonoDeContacto VARCHAR(100),
	cIdentificacion INT,
	FOREIGN KEY(cIdentificacion) REFERENCES cliente(identificacion)
);

CREATE TABLE estado(
	identificacion INT PRIMARY KEY,
	estado VARCHAR(100),
	fechaYHoraDelEstado TIMESTAMP
);

CREATE TABLE servicio(
	codigo INT PRIMARY KEY,
	fechaYHoraDeSolicitud TIMESTAMP,
	origen VARCHAR(100),
	destino VARCHAR(100),
	descripcion TEXT,
	numeroDePaquetes INT,
	tipoDeTransporte VARCHAR(100),
	cIdentificacion INT,
	eIdentificacion INT,
	FOREIGN KEY (cIdentificacion) REFERENCES cliente(identificacion),
	FOREIGN KEY (eIdentificacion) REFERENCES estado(identificacion)
);