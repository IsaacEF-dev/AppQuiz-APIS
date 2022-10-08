const Connection=require("../../connection");
const UsuarioCRUD=require("../quizBD/usuarioCRUD");
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");

class processUsuario{
    registrarUser(data){
        return new Promise(async(resolve,reject)=>{
            let connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                return reject(error);
            }

            try {
                const usuariocrud=new UsuarioCRUD(conexion);

                /**encriptar Password */
                data.pass=await bcrypt.hash(data.pass,10);
                
                /**Validar que no exista un correo ya registrado */
                let email=await usuariocrud.validarEmail(data);
                if(Object.keys(email).length!=0){
                    conexion.end();
                    return resolve({response:{code: 2001, data: 'S/R', message: 'Este corre ya existe'},status:400})
                }
                
                await usuariocrud.registrarUser(data);

                conexion.end();
                return resolve({response:{code: 0, data: data || 'S/R', message: 'Usuario Agregado Correctamente'},status:200})
            } catch (error) {
                conexion.end();
                console.log(error)
                return reject(error);
            }
        })
    }

    loginUser(data){
        return new Promise(async(resolve,reject)=>{
            let connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                return reject(error);
            }

            try {
                const usuarioCrud=new UsuarioCRUD(conexion);
                
                let passBD=await usuarioCrud.loginUser(data);
                
                conexion.end();
                if(Object.keys(passBD).length===0){
                    return resolve({response:{code: 201, data: 'S/R', message: 'Este usuario no existe'},status:400})
                }
                                
                if(!bcrypt.compareSync(data.pass,passBD[0].pass)){
                    return resolve({response:{code: 200, data: 'S/R', message: 'Credenciales Incorrectas'},status:400})
                }
                
                const accessToken=jwt.sign({data:data.correo}, process.env.SECRET, { expiresIn: '5h' });
                
                return resolve({response:{code: 0, token: accessToken, message: 'Usuario Autenticado'},status:400})
                
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        })
    }

    loginGoogle(data){
        return new Promise(async (resolve,reject)=>{
            let connection=new Connection();
            let conexion;

            try {
                conexion=await connection.crearConexionQuiz();
            } catch (error) {
                return reject(error);
            }

            try {
                let accessToken;
                const usuariocrud=new UsuarioCRUD(conexion);
                
                let result=await usuariocrud.validarEmail(data);

                if(Object.keys(result).length==0){
                    await usuariocrud.registrarUser(data);
                    conexion.end();
                     accessToken=jwt.sign({data:data.correo}, process.env.SECRET, { expiresIn: '1m' });
                    return resolve({response:{code: 0, data: accessToken, message: 'Usuario Agregado Correctamente'},status:200})
                }
                accessToken=jwt.sign({data:data.correo}, process.env.SECRET, { expiresIn: '1m' });

                let passBD=await usuariocrud.loginUser(data);
                conexion.end();
                
                if(!(bcrypt.compareSync(data.pass,passBD[0].pass))){
                    return reject({response:{code: 200, data: 'S/R', message: 'Credenciales Incorrectas'},status:400})
                }
                console.log(accessToken)
                 resolve({response:{code: 0, token: accessToken, message: 'Usuario Autenticado'},status:200})
            } catch (error) {
                conexion.end();
                console.log(error,"error")
                reject(error);
            }
        })
    }
}

module.exports=processUsuario;