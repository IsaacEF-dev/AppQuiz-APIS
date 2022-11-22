const Connection = require("../../connection");
const CategoriaCRUD = require("../quizBD/categoriaCRUD");

class CategoriaProcess{
    getCategorias=()=>{
        return new Promise(async(resolve,reject)=>{
            let connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                return reject(error);
            }

            try {
                const categoriacrud=new CategoriaCRUD(conexion);
                const categorias=await categoriacrud.getCategoria();
                
                conexion.end();
                if(Object.keys(categorias).length==0){
                    return reject({response:{code: 201, data: 'S/R', message: 'No Existen ninguna categoria'},status:400})
                }
                
                
                resolve({response:{code: 0, data: categorias, message: 'Categorias Obtenidas'},status:200})
            } catch (error) {
                console.log(error);
                conexion.end();
                reject(error);
            }
        })
    }
}

module.exports=CategoriaProcess;