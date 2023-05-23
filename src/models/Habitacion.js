const {DataTypes}=require("sequelize")
const {sequelize}=require("../database/database")
const {Reserva}=require("./Reserva")

const Habitacion=sequelize.define("Habitacion",{
    idHabitacion:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idTipoH:{
        type:DataTypes.INTEGER
    },
    precioUnitario:{
        type:DataTypes.FLOAT
    },
    Descripcion:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{timestamps:false});

// Habitacion.hasMany(Reserva,{
//     foreignKey:"idHabitacionReservada",
//     sourceKey:"idHabitacion"
// })

// Reserva.belongsTo(Habitacion,{
//     foreignKey:"idHabitacionReservada",
//     targetId:"idHabitacion"
// })

module.exports={Habitacion}