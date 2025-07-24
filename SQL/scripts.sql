-- saber  el  monto gastado por cliente

SELECT
    c.nombres,
    c.apellidos,
    SUM(e.monto_compra) as 'Monto Gastado'

FROM cliente as c 
JOIN entrada as e
    ON c.id_cliente = e.cliente_id

GROUP BY c.nombres, c.apellidos;

-----------------------------------------------------------------------------

-- saber los clientes que tienne cupones, su estado y los puntos requeridos:
select CONCAT(c.nombres,' ',c.apellidos) as Clientes, cu.estado, cu.puntos_requeridos
from cliente as c
join cupon as cu
	on c.id_cliente = cu.cliente_id
;