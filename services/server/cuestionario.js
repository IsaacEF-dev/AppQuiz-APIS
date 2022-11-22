const CuestionarioController = require("../../controller/CuestionarioController");
const cuestionariocontroller=new CuestionarioController();
module.exports=(app)=>{

    app.post("/insertCuestionario",(req,res)=>{
        const data={nombre,idCategoria,idUsuario}=req.body;

        cuestionariocontroller.insertCuestionario(data)
        .then(result=>res.status(result.status).json(result.response))
        .catch(error=>res.status(404).json(error));
    })

    app.get("/cuestionarios",(req,res)=>{
        const data={idUsuario}=req.query;
        console.log(data);
        cuestionariocontroller.getCuestionario(data)
        .then(result=>res.status(result.status).json(result.response))
        .catch(error=>res.status(404).json(error));
    })
}