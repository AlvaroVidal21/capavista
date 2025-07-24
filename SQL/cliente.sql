CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    -- Uso varchar y no int porque  recuerdo que hay DNI que empiezan con 0 y como en excel prefiero evitar un posible conflicto.
    dni VARCHAR(8) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    ano_nacimiento INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    puntos  INT DEFAULT 0,
    fecha_registro DATETIME DEFAULT GETDATE()
);



INSERT INTO cliente (dni, nombres, apellidos, ano_nacimiento, correo)
VALUES 
('09123456', 'Sherlock', 'Holmes', 1999, 'sherlock.holmes@cybermail.com'),
('09234567', 'John', 'Watson', 1998, 'john.watson@medtech.org'),
('09345678', 'Hercule', 'Poirot', 1995, 'hercule.poirot@graycells.net'),
('09456789', 'Arthur', 'Hastings', 2002, 'arthur.hastings@cinefan.com'),
('09567890', 'Irene', 'Adler', 2001, 'irene.adler@operaonline.net');
