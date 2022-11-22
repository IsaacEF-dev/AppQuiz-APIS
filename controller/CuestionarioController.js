const CuestionarioProcess = require("../model/MYSQL/process/CuestionarioProcess");
const cuestionarioprocess=new CuestionarioProcess();
class CuestionarioController{
    insertCuestionario(data){
        return cuestionarioprocess.insertCuestionario(data);
    }
    getCuestionario(data){
        return cuestionarioprocess.getCuestionario(data);
    }
}

module.exports=CuestionarioController;