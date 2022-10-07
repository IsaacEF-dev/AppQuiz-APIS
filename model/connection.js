const mysql=require("mysql2")
const Constants=require("./constants/index");

class Connection{
    constructor(){
        this.constants=new Constants();
    };

    crearConexionQuiz(){
        return new Promise((resolve,reject)=>{
            let connection=mysql.createConnection(this.constants.mysqlQuiz());
            connection.connect(error=>{
                if(error){
                    console.log("error de conexion");
                    reject(error);
                }else{
                    resolve(connection);
                }
            })
        })
    }
}

module.exports=Connection;