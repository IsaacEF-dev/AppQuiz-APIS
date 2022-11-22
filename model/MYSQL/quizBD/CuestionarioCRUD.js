class CuestionarioCRUD{
    constructor(connection){
        this.connection=connection;
    }

    insertCuestionario(data){
        return new Promise((resolve,reject)=>{
            const query="insert into cuestionario(nombre,id_categoria,id_usuario) values(?,?,?)"

            this.connection.query(query,[data.nombre,data.idCategoria,data.idUsuario],(error,result)=>{
                if(error)reject(error);
               
                resolve(result);
            })
        })
    }

    getCuestionario(data){
        return new Promise((resolve,reject)=>{
            const query=`select c.nombre as cuestionario,c.id as idCuestionario,ca.nombre as categoria,ca.id as idCategoria from cuestionario c left join categoria ca 
            on c.id_categoria=ca.id left join usuario u on c.id_usuario=u.id where u.id=?`

            this.connection.query(query,[data.idUsuario],(error,result)=>{
                
                if(error)reject(error);
               
                resolve(result);
            })
        })
    }
}

module.exports=CuestionarioCRUD;