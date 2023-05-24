const { sequelize } = require("../database/database");
const fs = require("fs-extra");

const getHabitacionesDisponibles = async (req, res) => {
  try {
    const query = `SELECT DISTINCT H.idHabitacion, H.precioUnitario, H.Descripcion, H.idTipoH,H.cupoMax
    FROM Habitacion H 
    JOIN TipoHabitacion T 
    ON H.idTipoH = 1 or  H.idTipoH = 2
    LEFT JOIN Reserva R ON H.idHabitacion = R.idHabitacionReservada AND (R.fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' OR R.fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}') WHERE R.idHabitacionReservada IS NULL and H.cupoMax>=${req.query.n};`;

    const result = await sequelize.query(query);

    res.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
  }
};

const isParo = async (req, res) => {
  try {
    const query = `SELECT CASE
    WHEN fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}'OR fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' THEN 1
    ELSE 0
  END AS FechaEnRango
  FROM ParoArmado`;
    const result = await sequelize.query(query);
    res.json(result[0]);
  } catch (error) {}
};

const parqueadero = async (req, res) => {
  try {
    const query = `DECLARE @base INT SET @base=25
    SELECT (@base - COALESCE(COUNT(*),0)) AS ServicioParqueadero
    FROM Reserva
    Where servicioParqueadero='true' AND
  (fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' OR fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}')`;
    const result = await sequelize.query(query);
    res.json(result[0]);
  } catch (error) {}
};

const transporte = async (req, res) => {
  try {
    const query = `DECLARE @base INT SET @base=20
    SELECT (@base - COALESCE(SUM(totalPersonas), 0)) AS ServicioTransporte
    FROM Reserva
    Where servicioTransporte='true' AND
    (fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' OR fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}')`;
    const result = await sequelize.query(query);
    res.json(result[0]);
  } catch (error) {}
};

const restaurante = async (req, res) => {
  try {
    const query = `DECLARE @base INT SET @base=40
    SELECT (@base - COALESCE(SUM(totalPersonas),0)) AS ServicioRestaurante
    FROM Reserva
    Where (servicioDesayuno='true' or servicioAlmuerzo='true' or servicioCena='true') AND
    (fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' OR fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}')`;
    const result = await sequelize.query(query);
    res.json(result[0]);
  } catch (error) {}
};

const getHabitacion = async (req, res) => {
  try {
    const query = `select * from Habitacion,TipoHabitacion where idHabitacion=${req.params.id} and idTipo=idTipoH`;

    const result = await sequelize.query(query);

    res.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getHabitacionesCompartidas = async (req, res) => {
  try {
    const query = `DECLARE @FechaInicio DATE = '${req.query.fechai}'; 
    DECLARE @FechaFin DATE = '${req.query.fechaf}'; 
    
    WITH HabitacionesDisponibles AS (
        SELECT
            h.idHabitacion,
            h.idTipoH,
            h.precioUnitario,
            h.Descripcion,
            h.cantidad,
            h.cupoMax,
            COALESCE(SUM(r.totalPersonas), 0) AS totalPersonasReservadas
        FROM
            dbo.Habitacion h
        LEFT JOIN
            dbo.Reserva r ON h.idHabitacion = r.idHabitacionReservada
            AND r.estado <> 'Cancelada'
            AND (
                (r.fechaInicio >= @FechaInicio AND r.fechaInicio <= @FechaFin)
                OR (r.fechaFin >= @FechaInicio AND r.fechaFin <= @FechaFin)
                OR (r.fechaInicio <= @FechaInicio AND r.fechaFin >= @FechaFin)
            )
        WHERE
            h.idTipoH = 3
        GROUP BY
            h.idHabitacion,
            h.idTipoH,
            h.precioUnitario,
            h.Descripcion,
            h.cantidad,
            h.cupoMax
    )
    SELECT
        *
    FROM
        HabitacionesDisponibles
    WHERE
        cupoMax - totalPersonasReservadas >= ${req.query.n};
  `;

    const result = await sequelize.query(query);

    res.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
  }
};

const postReserva = async (req, res) => {
  try {
    const path = "./src/public/json/" + req.body.nConfirmacion + ".json";

    const query = `INSERT INTO Reserva (estado,fechaInicio,fechaFin,numeroConfirmacion,idHabitacionReservada,horaCheckIn,horaCheckOut,servicioDesayuno,servicioAlmuerzo,servicioCena,servicioParqueadero,servicioTransporte,total,totalPersonas,infoHuespedes) VALUES ('${req.body.estado}', ${req.body.fechai}, ${req.body.fechaf},${req.body.nConfirmacion},${req.body.idHabitacion},${req.body.horaCheckin},${req.body.horaCheckout},'${req.body.restaurante}','${req.body.restaurante}','${req.body.restaurante}','${req.body.transporte}','${req.body.parqueadero}',${req.body.total},${req.body.totalPersonas},'${path}');`;

    const result = await sequelize.query(query);

    await fs.writeJson(path, JSON.stringify(req.body.infoHuespedes));

    res.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  getHabitacionesDisponibles,
  getHabitacion,
  isParo,
  restaurante,
  parqueadero,
  transporte,
  postReserva,
  getHabitacionesCompartidas,
};
