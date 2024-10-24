import jwt from 'jsonwebtoken';
import UsuarioRepositorie from '../repositories/usuarioRepositories.js';

const SEGREDO = "A_ARTE_DA_GUERRA_SUN_TZU"

export default class AuthMiddleware {

    gerarToken(id,nome,email){
        return jwt.sign({
            id: id,
            nome: nome,
            email: email
        }, SEGREDO)
    }

    async validar(req,res,next){

        let chave = req.cookies
        if(chave){
            try{
                let objUsuario = jwt.verify(chave, SEGREDO);
                let repo = new UsuarioRepositorie();
                let usuario = await repo.obter(objUsuario.id);
                if(usuario){
                    let auth = new AuthMiddleware();
                    let newToken = auth.gerarToken(objUsuario.id, objUsuario.nome, objUsuario.email);
                    res.cookie("chave", newToken, {
                        httpOnly: true
                    });
                    req.usuarioLogado = usuario
                    next();
                }else{
                    res.status(401).json({msg: "Nao Autorizado"});
                }
            }catch(ex){
                res.status(401).json({msg: "Nao Autorizado"});
            }
        }else{
            res.status(401).json({msg: "Nao Autorizado"});
        }
    }

}