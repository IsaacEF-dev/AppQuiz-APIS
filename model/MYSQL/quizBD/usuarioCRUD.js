class UsuarioCRUD{
    constructor(connection){
        this.connection=connection;
    }

    registrarUser(data){
        console.log(data)
        return new Promise((resolve,reject)=>{
            const query=`insert into usuario(nombre,apellidos,correo,pass) values(?,?,?,?)`;
            console.log(data)
            this.connection.query(query,[data.nombre,data.apellidos,data.correo,data.pass],(error,result)=>{
                if(error)reject(error);
                resolve(result);
            })
        })
    }

    loginUser(data){
        return new Promise((resolve,reject)=>{
            const query=`select pass,nombre,id from usuario where correo=?`;
            
            this.connection.query(query,[data.correo],(error,result)=>{
                if(error){return reject(error)};
                resolve(result);
            })
        })
    }

    validarEmail(data){
        return new Promise((resolve,reject)=>{
            const query="select id from usuario where correo=?";

            this.connection.query(query,[data.correo],(error,result)=>{
                if(error)reject(error);
                resolve(result);
            })
        })
    }

}

module.exports=UsuarioCRUD;