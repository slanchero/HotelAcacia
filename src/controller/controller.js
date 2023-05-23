const { sequelize } = require("../database/database");

const getHabitaciones=async(req,res)=>{
    const response = await fetch(`/api/books?fechai=${req.query.fechai}&fechaf=${req.query.fechai}&tipo=${req.query.tipo}`);
    const data = await response.json();
    console.log(data)
}

module.exports={getHabitaciones}