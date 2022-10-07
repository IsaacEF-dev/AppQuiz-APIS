const usuarioProcess=require("../model/MYSQL/process/usuarioProcess");
const usuarioprocess=new usuarioProcess()
class UsuarioController{
    registroUser(data){
        return usuarioprocess.registrarUser(data);
    }

    loginUser(data){
        return usuarioprocess.loginUser(data);
    }
}

module.exports=UsuarioController;