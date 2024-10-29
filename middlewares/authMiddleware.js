import jwt from 'jsonwebtoken';
import UsuarioRepositorie from '../repositories/usuarioRepositories.js';

const SEGREDO = "A_ARTE_DA_GUERRA_SUN_TZU"

export default class AuthMiddleware {

    gerarToken(id,nome,email){
        return jwt.sign({
            id: id,
            nome: nome,
            email: email
        }, SEGREDO, {expiresIn: "1h"});
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
                        httpOnly: true,
                        sameSite: "none",
                        path: "/",
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

    async validarParaFrontEnd(cookie) {
        if (cookie) {
            try {
            let objUsuario = jwt.verify(cookie.value, SEGREDO);
            let repo = new UsuarioRepositorie();
            let usuario = await repo.obter(objUsuario.id);
            let auth = new AuthMiddleware();
            let NovoCookie = auth.gerarToken(objUsuario.id, objUsuario.nome, objUsuario.email);
            if (usuario) {
                let retorno = {
                    chave: NovoCookie,
                    nome: usuario[0].nome,
                    email: usuario[0].email,
                    id: usuario[0].id
                };
                return retorno;
            } else {
                throw new Error("Nao Autorizado");
            }
            } catch (ex) {
            throw new Error("Nao Autorizado");
            }
        } else {
            throw new Error("Nao Autorizado");
        }
    }
}