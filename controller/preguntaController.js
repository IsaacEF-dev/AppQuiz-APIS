const PreguntaProcess = require("../model/MYSQL/process/preguntaProcess");
const preguntaprocess=new PreguntaProcess();

class PreguntaController{
    insertPregunta(data){
        return preguntaprocess.insertPregunta(data);
    }
}
module.exports=PreguntaController;