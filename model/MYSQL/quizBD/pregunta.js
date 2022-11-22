class PreguntaCRUD{
    constructor(connection){
        this.connection=connection
    }

    insertPregunta(data){
        return new Promise((resolve,reject)=>{
            const query="insert into pregunta(nombre) values(?)";

            this.connection.query(query,[data.nombre],(error,result)=>{
                if(error)reject(error);
                resolve(result);
            })
        })
    }

    insertRespuesta(data){
        return new Promise((resolve,reject)=>{
            const query="insert into respuesta(nombre,correcta,id_pregunta) values(?,?,?)";

            this.connection.query(query,[data.nombre,data.correcta,data.idPregunta],(error,result)=>{
                if(error)reject(error);
                resolve(result);
            })
        })
    }

    insertPreguntaRespuesta(data){
        return new Promise((resolve,reject)=>{
            const query="insert into pregunta_cuestionario(id_pregunta,id_cuestionario) values(?,?)";

            this.connection.query(query,[data.idPregunta,data.idCuestionario],(error,result)=>{
                if(error)reject(error);
                resolve(result);
            })
        })
    }
}

module.exports=PreguntaCRUD;