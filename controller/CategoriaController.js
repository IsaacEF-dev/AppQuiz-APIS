const CategoriaProcess = require("../model/MYSQL/process/CategoriaProcess")
const categoriaprocess=new CategoriaProcess();
class CategoriaController{
    getCategorias=()=>{
        return categoriaprocess.getCategorias();
    }
}

module.exports=CategoriaController;