const {Router}=require("express")
const {getHabitacionesCompartidas,getHabitacionesDisponibles,getHabitacion,isParo,restaurante,transporte,parqueadero, postReserva}=require("../controller/book.controller")

const router=Router()

router.get("/",getHabitacionesDisponibles)

router.get("/comp",getHabitacionesCompartidas)

router.get("/paro",isParo)

router.get("/transporte",transporte)

router.get("/restaurante",restaurante)

router.get("/parqueadero",parqueadero)

router.get("/:id",getHabitacion)

router.post("/",postReserva)

module.exports=router