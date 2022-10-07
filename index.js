const express= require("express");
const app=express();
const morgan=require("morgan");
const cors=require("cors")

app.use(cors())
app.use(express.json({limit: '10000kb', extended:true}));
app.use(express.urlencoded({limit: '10000kb', extended:true}));

app.use(morgan("dev"));

require("./services/server")(app);

app.listen(4002,()=>{
    console.log("Servidor creado en el puerto 4002")
})