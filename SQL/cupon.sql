CREATE TABLE cupon(
    id_cupon INT PRIMARY KEY IDENTITY(1,1),
    cliente_id INT NOT NULL,
    codigo varchar(8) UNIQUE NOT NULL,
    -- se necesita 50 puntos como minimo para canjear un cupón
    puntos_requeridos INT NOT NULL DEFAULT 50,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('pendiente', 'canjeado', 'vencido')),
    fecha_emision DATETIME DEFAULT GETDATE(),
    fecha_canje DATETIME NULL,
    --  NULO HASTA QUE EL CUPON SE CANJEE

    CONSTRAINT fk_cliente_cupon FOREIGN KEY (cliente_id)
    REFERENCES cliente(id_cliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);