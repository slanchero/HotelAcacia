const {Router}=require("express")
const { sequelize } = require("../database/database");

const router=Router()

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/reservar",async(req,res)=>{

    var query
    if(req.query.tipo==3){
        query=`DECLARE @FechaInicio DATE = '${req.query.fechai}'; 
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
      `
    }else{
        query = `SELECT DISTINCT H.idHabitacion, H.precioUnitario, H.Descripcion, H.idTipoH,H.cupoMax
    FROM Habitacion H 
    JOIN TipoHabitacion T 
    ON H.idTipoH = 1 or  H.idTipoH = 2
    LEFT JOIN Reserva R ON H.idHabitacion = R.idHabitacionReservada AND (R.fechaInicio BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}' OR R.fechaFin BETWEEN '${req.query.fechai}' AND '${req.query.fechaf}') WHERE R.idHabitacionReservada IS NULL and H.cupoMax>=${req.query.n};`;
    }

    const result = await sequelize.query(query);
    console.log(result)
    res.render("book",{data:result})
})

router.get("/info",(req,res)=>{
    res.render("about")
})
 
router.get("/contact",(req,res)=>{
    res.render("contact")
})

router.get("/services",async (req,res)=>{
    if ('id' in req.query && 'n' in req.query && 'fechai' in req.query&& 'fechaf' in req.query){
        const query = `SELECT * FROM Habitacion,TipoHabitacion where idHabitacion=${req.query.id} and idTipo=idTipoH`;
    
        const result = await sequelize.query(query);
        console.log(result[0][0])
        res.render("extras",{data:result[0][0],n:req.query.n,fechai:req.query.fechai,fechaf:req.query.fechaf,id:req.query.id});
    }else{
        res.status(404).render("404")
    }
})

router.get("/book",async (req,res)=>{
    if ('id' in req.query && 'n' in req.query && 'fechai' in req.query&& 'fechaf' in req.query){
        const query = `SELECT * FROM Habitacion,TipoHabitacion where idHabitacion=${req.query.id} and idTipo=idTipoH`;
    
        const result = await sequelize.query(query);
        console.log(result[0][0])
        res.render("details",{data:result[0][0],n:req.query.n,fechai:req.query.fechai,fechaf:req.query.fechaf,id:req.query.id});
    }else{
        res.status(404).render("404")
    }
})

router.get("/pay",async (req,res)=>{
    if ('id' in req.query && 'n' in req.query && 'fechai' in req.query&& 'fechaf' in req.query){
        const query = `SELECT * FROM Habitacion,TipoHabitacion where idHabitacion=${req.query.id} and idTipo=idTipoH`;
    
        const result = await sequelize.query(query);
        console.log(result[0][0])
        res.render("Pay",{data:result[0][0],n:req.query.n,fechai:req.query.fechai,fechaf:req.query.fechaf,id:req.query.id});
    }else{
        res.status(404).render("404")
    }
})

router.get("/bookconfirm",(req,res)=>{
    res.render("bookconfirm")
})

module.exports=router 