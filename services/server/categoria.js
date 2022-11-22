const CategoriaController = require("../../controller/CategoriaController")
const categoriaController=new CategoriaController();
module.exports=(app)=>{
    app.get("/categoria",(req,res)=>{
        categoriaController.getCategorias()
        .then(result=>res.status(result.status).json(result.response))
        .catch(error=>res.status(404).json(error));
    })
}