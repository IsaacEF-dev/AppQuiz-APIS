const Response = require("../../../../Proyecto_residencias/InventarioEmpresa/model/Constants/response");
const Connection =require("../../connection");
const PreguntaCRUD=require("../quizBD/pregunta");
const response = new Response();
class PreguntaProcess{
    insertPregunta(data){
        return new Promise(async(resolve,reject)=>{
            let connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                reject(error);
            }

            try {
                conexion.beginTransaction();
                const preguntacrud=new PreguntaCRUD(conexion);

                let idPregunta=await preguntacrud.insertPregunta(data);
                data.idPregunta=idPregunta;

                await preguntacrud.insertPreguntaRespuesta(data);

                /**Creamos un favor anidado para la insercion de la preguntas y despues las respuestas de las preguntas */
                data.respuestas.forEach(async (pregunta)=>{
                    await preguntacrud.insertRespuesta(pregunta);
                })

                conexion.commit(()=>conexion.end());

            } catch (error) {
                conexion.rollback(()=>conexion.end());
                console.log(error);
                return reject(response.query(error));
            }
        })
    }
}

module.exports=PreguntaProcess;