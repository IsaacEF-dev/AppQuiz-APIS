class CategoriaCRUD{

    constructor(connection){
        this.connection=connection;
    }

    getCategoria=()=>{
        return new Promise((resolve,reject)=>{
            const query="select id,nombre from categoria";
            
            this.connection.query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            })

        })
    }
}

module.exports=CategoriaCRUD;