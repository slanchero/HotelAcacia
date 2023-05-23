const express=require('express')
const morgan=require('morgan')
const path=require("path")
const ejs=require("ejs")
const { sequelize ,test} = require("./database/database");

//inicializacion del servidor
const app=express()

//Configuracion del servidor
app.set("port",process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"))

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())

//Rutas
app.use("/api/books",require("./routes/book.routes"))
app.use(require("./routes/routes"))

//404
app.use((req,res)=>{
    res.status(404).render("404")
})

//Empezar aplicaciòn
app.listen(app.get("port"),()=>console.log(`Listen on port ${app.get("port")}`))
test()
