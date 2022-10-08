const { check,validationResult,body } = require('express-validator');
const Validation =require("../../model/constants/validation");
const UsuarioController=require("../../controller/usuarioController");
const usuariocontroller=new UsuarioController();
const jwt=require("jsonwebtoken");
const validation=new Validation();

module.exports=(app)=>{
    app.post("/registro",(req,res)=>{
        const data={nombre,apellidos,correo,pass}=req.body;

        if(!validation.tryOut({nombre},validation.regularExp().nombres,50) ||
        !validation.tryOut({apellidos},validation.regularExp().nombres,60) ||
        !validation.tryOut({correo},validation.regularExp().correos,50) || 
        !validation.tryOut({pass},validation.regularExp().letras,40)){
            res.status(404).json({code:20,data:"S/R",message:"Parametros no validos"})
        }

        usuariocontroller.registroUser(data)
        .then(result=>res.status(result.status).json(result.response))
        .catch(error=>res.status(404).json(error))
    })

    app.post("/registro/google",(req,res)=>{
        const data={nombre,apellidos,correo,pass}=req.body;
        
        usuariocontroller.loginGoogle(data)
        .then(result=>{
            console.log(result);
            res.status(result.status).json(result.response)})
        .catch(error=>{
            console.log("errorsote wey")
            res.status(404).json(error)});
        
    })

    app.post("/auth",(req,res)=>{
        const data={correo,pass}=req.body;
        if(!validation.tryOut({pass},validation.regularExp().letras,40) ||
        !validation.tryOut({correo},validation.regularExp().correos,50)){
            res.status(404).json({code:20,data:"S/R",message:"Parametros no validos"})
        }

        usuariocontroller.loginUser(data)
        .then(result=>res.status(result.status).json(result.response))
        .catch(error=>res.status(400).json(error));
    })

    app.get("/home",validateToken,(req,res)=>{
        
        res.send("HOME QUIZ")

    })

    function validateToken(req,res,next){
        const token=req.query.token;

        if(!token)res.send("Acceso denegado");

        jwt.verify(token,process.env.SECRET,(err,result)=>{
            if(err){
                res.send("Acceso denegado,token expirado o incorrecto");
            }else{
                next();
            }
        })

    }
}