
CREATE TABLE entrada(
    id_entrada INT PRIMARY KEY IDENTITY(1,1),
    -- Uso primero client_id en vez de id_cliente para saber que es una clave foránea
    cliente_id INT NOT NULL,
    fecha_entrada DATETIME DEFAULT GETDATE(),
    sala VARCHAR(50) NOT NULL,
    monto_compra DECIMAL(10, 2) NOT NULL,

    CONSTRAINT fk_cliente_entrada FOREIGN KEY (cliente_id)
    REFERENCES cliente(id_cliente) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);