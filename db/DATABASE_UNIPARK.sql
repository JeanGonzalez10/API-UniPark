CREATE OR REPLACE DATABASE UNIPARK;

USE UNIPARK;

CREATE TABLE USUARIO (
	id_usuario BIGINT(20) NOT NULL,
	nick varchar(15) NOT NULL,
	clave varchar(20) NOT NULL,
	PRIMARY KEY (id_usuario)
);

CREATE TABLE TIPO_EMPLEADO (
	id_tipo INT(1) NOT NULL,
	descripcion_empleado varchar(20) NOT NULL,
	PRIMARY KEY (id_tipo)
);

CREATE TABLE EMPLEADO (
	cedula BIGINT(20)  NOT NULL,
	nombres varchar(20) NOT NULL,
    apellidos varchar(20) NOT NULL,
	celular FLOAT(20) NOT NULL,
	id_tipo_empleado INT(2) NOT NULL,
	PRIMARY KEY (cedula)
);

ALTER TABLE EMPLEADO ADD FOREIGN KEY (id_tipo_empleado) REFERENCES TIPO_EMPLEADO(id_tipo);


CREATE TABLE CLIENTE (
	cedula BIGINT(20)  NOT NULL,
	nombres varchar(20) NOT NULL,
    apellidos varchar(20) NOT NULL,
	celular FLOAT(20) NOT NULL,
	PRIMARY KEY (cedula)
);

CREATE TABLE TIPO_VEHICULO (
	id_tipo INT(1) NOT NULL,
	descripcion_vehiculo varchar(20) NOT NULL,
	PRIMARY KEY (id_tipo)
);


CREATE TABLE VEHICULO (
	placa_vehiculo varchar(7) NOT NULL,
    id_tipo_vehiculo INT(1) NOT NULL,
	id_propietario BIGINT(20) NOT NULL,
	PRIMARY KEY (placa_vehiculo)
);

ALTER TABLE VEHICULO ADD FOREIGN KEY (id_tipo_vehiculo) REFERENCES TIPO_VEHICULO(id_tipo);
ALTER TABLE VEHICULO ADD FOREIGN KEY (id_propietario) REFERENCES CLIENTE(cedula);

CREATE TABLE TIPO_CELDA (
	id_tipo INT(1) NOT NULL,
	descripcion_celda varchar(20) NOT NULL,
	PRIMARY KEY (id_tipo)
);

CREATE TABLE ESTADO_CELDA (
	id_estado INT(1) NOT NULL,
	descripcion_estado varchar(20) NOT NULL,
	PRIMARY KEY (id_estado)
);

CREATE TABLE PARQUEADERO (
	id_celda INT(2) NOT NULL,
    id_tipo_celda INT(1) NOT NULL,
	id_estado_celda INT(1) NOT NULL,
	PRIMARY KEY (id_celda)
);

ALTER TABLE PARQUEADERO ADD FOREIGN KEY (id_tipo_celda) REFERENCES TIPO_CELDA(id_tipo);
ALTER TABLE PARQUEADERO ADD FOREIGN KEY (id_estado_celda) REFERENCES ESTADO_CELDA(id_estado);

CREATE TABLE TIPO_LAVADO (
	id_tipo INT(1) NOT NULL,
	descripcion_lavado varchar(20) NOT NULL,
	PRIMARY KEY (id_tipo)
);

CREATE TABLE LAVADERO(
	id_solicitud FLOAT(5) NOT NULL AUTO_INCREMENT,
	placa_vehiculo varchar(7) NOT NULL,
	fecha_solicitud DATE NOT NULL,
	id_tipo_lavado INT(1) NOT NULL,
	tarifa FLOAT(20) NOT NULL,
	id_empleado BIGINT(20),
	PRIMARY KEY (id_solicitud)
);

ALTER TABLE LAVADERO ADD FOREIGN KEY (placa_vehiculo) REFERENCES VEHICULO(placa_vehiculo);
ALTER TABLE LAVADERO ADD FOREIGN KEY (id_tipo_lavado) REFERENCES TIPO_LAVADO(id_tipo);
ALTER TABLE LAVADERO ADD FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(cedula);

CREATE TABLE RESERVA(
	id_reserva FLOAT(5) NOT NULL AUTO_INCREMENT,
	fecha_reserva DATE NOT NULL,
	placa_vehiculo varchar(7) NOT NULL,
	id_celda INT(1) NOT NULL,
	fecha_ingreso DATE,
	fecha_salida DATE,
	PRIMARY KEY (id_reserva)
);

ALTER TABLE RESERVA ADD FOREIGN KEY (placa_vehiculo) REFERENCES VEHICULO(placa_vehiculo);
ALTER TABLE RESERVA ADD FOREIGN KEY (id_celda) REFERENCES PARQUEADERO(id_celda);



CREATE TABLE FACTURACION(
	id_factura FLOAT(5) NOT NULL AUTO_INCREMENT,
	id_reserva FLOAT(5),
	id_solicitud_lavado FLOAT(5),
	fecha DATE NOT NULL,
	valor_total FLOAT(10),
	id_cliente BIGINT(20) NOT NULL,
	PRIMARY KEY (id_factura)
);

ALTER TABLE FACTURACION ADD FOREIGN KEY (id_reserva) REFERENCES RESERVA(id_reserva);
ALTER TABLE FACTURACION ADD FOREIGN KEY (id_solicitud_lavado) REFERENCES LAVADERO(id_solicitud);
ALTER TABLE FACTURACION ADD FOREIGN KEY (id_cliente) REFERENCES CLIENTE(cedula);


INSERT INTO TIPO_CELDA (id_tipo,descripcion_celda) VALUES
(1,'AUTOMOVIL'),
(2,'MOTOCICLETA');

INSERT INTO TIPO_VEHICULO (id_tipo,descripcion_vehiculo) VALUES
(1,'AUTOMOVIL'),
(2,'MOTOCICLETA');

INSERT INTO ESTADO_CELDA (id_estado,descripcion_estado) VALUES
(1,'LIBRE'),
(2,'OCUPADO');

INSERT INTO TIPO_EMPLEADO (id_tipo,descripcion_empleado) VALUES
(1,'ADMINSITRADOR'),
(2,'OPERARIO'),
(3,'LAVADOR');

INSERT INTO TIPO_LAVADO (id_tipo,descripcion_lavado) VALUES
(1,'NORMAL'),
(2,'SECO'),
(3,'ESPECIAL');

INSERT INTO CLIENTE  (cedula,nombres,apellidos,celular) VALUES
(1152462000,'DAVID','RAMIREZ',3234444112),
(1152132122,'SIMON','VANEGAS',3002132211);

INSERT INTO EMPLEADO (cedula,nombres,apellidos,celular,id_tipo_empleado) VALUES
(10251123521,'JEAN','PEREZ',3002536221,1);

INSERT INTO USUARIO (id_usuario,nick,clave) VALUES
(1152462000,'DAVID.RAMIREZ','1234'),
(1152132122,'SIMON.VANEGAS','4321'),
(10251123521,'JEAN.PEREZ','1122'),
(10251123523,'ROISON.ANGULO','1133'),
(10251123526,'STIVEN.ROLDAN','2211');

INSERT INTO VEHICULO (placa_vehiculo,id_tipo_vehiculo,id_propietario) VALUES
('TEX001',1,1152462000),
('ABC12A',2,1152132122);

INSERT INTO PARQUEADERO (id_celda,id_tipo_celda,id_estado_celda) VALUES
(1,1,1),
(2,1,1),
(3,1,1),
(4,1,1),
(5,1,1),
(6,1,1),
(7,1,1),
(8,1,1),
(9,1,1),
(10,1,1),
(11,2,1),
(12,2,1),
(13,2,1),
(14,2,1),
(15,2,1),
(16,2,1),
(17,2,1),
(18,2,1),
(19,2,1),
(20,2,1);

