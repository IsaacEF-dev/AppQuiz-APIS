const Response = require("../../../Proyecto_residencias/InventarioEmpresa/model/Constants/response");
const PreguntaController = require("../../controller/preguntaController");
const preguntacontroller=new PreguntaController();
let response=new Response();
module.exports=(app)=>{
    app.post("/insertPregunta",(req,res)=>{
        const data={respuestas,nombre,correcta}=req.body;

        preguntacontroller.insertPregunta(data)
        .then(respuesta=>response.send(res,respuesta))
        .catch(error=>response.send(res,error));
    })
}