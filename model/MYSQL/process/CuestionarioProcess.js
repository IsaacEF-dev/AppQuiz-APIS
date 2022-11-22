const Connection = require("../../connection");
const CuestionarioCRUD = require("../quizBD/CuestionarioCRUD");

class CuestionarioProcess{
    insertCuestionario(data){
        return new Promise(async(resolve,reject)=>{
            const connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                console.log(error)
                reject(error);
            }

            try {
                let cuestionariocrud=new CuestionarioCRUD(conexion);
                let idCuestionario=await cuestionariocrud.insertCuestionario(data);
                let id=idCuestionario.insertId;

                resolve({response:{code: 0, data: id, message: 'Peticion realizada exitosamente'},status:200})

            } catch (error) {
                console.log(error);
                conexion.end();
                reject(error);
            }
        })
    }

    getCuestionario(data){
        return new Promise(async(resolve,reject)=>{
            const connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                console.log(error)
                reject(error);
            }

            try {
                let cuestionariocrud=new CuestionarioCRUD(conexion);
                let cuestionarios=await cuestionariocrud.getCuestionario(data);

                resolve({response:{code: 0, data: cuestionarios, message: 'Peticion realizada exitosamente'},status:200})

            } catch (error) {
                console.log(error);
                conexion.end();
                reject(error);
            }
        })
    }
}

module.exports=CuestionarioProcess;