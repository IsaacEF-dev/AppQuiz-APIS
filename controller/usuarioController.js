const usuarioProcess=require("../model/MYSQL/process/usuarioProcess");
const usuarioprocess=new usuarioProcess()
class UsuarioController{
    registroUser(data){
        return usuarioprocess.registrarUser(data);
    }

    loginUser(data){
        return usuarioprocess.loginUser(data);
    }

    loginGoogle(data){
       
        return usuarioprocess.loginGoogle(data);
    }
}

module.exports=UsuarioController;