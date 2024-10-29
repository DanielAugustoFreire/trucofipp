import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepositorie from "../repositories/usuarioRepositories.js";
import UsuarioEntitie from "../entities/usuarioEntity.js";
import Database from "../db/database.js";


export default class AutenticacaoController {

    async token(req, res) {
        try {
            let {email, senha} = req.body;

            if(email && senha) {
                //preciso instanciar a modelo e carregar um usuario baseado no email e senha
                let repo = new UsuarioRepositorie();
                let usuario = await repo.validarAcesso(email, senha);
                if(usuario.length > 0) {
                    let auth = new AuthMiddleware();
                    let chave = auth.gerarToken(usuario[0].id, usuario[0].nome, usuario[0].email);
                    res.cookie("chave", chave, {
                        httpOnly: true
                    });
                    res.status(200).json(chave);
                }
                else {
                    res.status(404).json({msg: "Credenciais inválidas!"});
                }
            }
            else{
                res.status(400).json({msg: "As credenciais não foram fornecidas corretamente!"})
            }
        }
        catch(ex) {
            console.log(ex)
            res.status(500).json({msg: ex.message});
        }
    }

    async cadastrar(req,res){
        const banco = new Database();
        await banco.AbreTransacao();
        try{
            let { nome, email, senha } = req.body;

            if(nome && email && senha){
                let usuario = new UsuarioEntitie(null, email, senha, nome);
                let repo = new UsuarioRepositorie(banco);
                let result = await repo.obterPorEmail(email);
                if(result){
                    res.status(400).json({msg: "Email já cadastrado!"});
                }else{
                    result = await repo.inserir(usuario);
                    if(result){
                        let auth = new AuthMiddleware();
                        let usuario_criado = await repo.obter(result);
                        let chave = auth.gerarToken(usuario_criado[0].id, usuario_criado[0].nome, usuario_criado[0].email);
                        await banco.Commit();
                        res.status(201).json({msg: "Sucesso ao inserir, Token: " + chave});
                    }
                    else
                        res.status(400).json({msg: "Erro ao inserir no BD"})
                }
            }
        }catch(ex){
            await banco.Rollback();
            console.log(ex);
            res.status(500).json({msg: ex.message});
        }
    }

    async validarFrontEnd(req,res){
        try{
            let chave = req.cookies.chave
            let auth = new AuthMiddleware();
            let usuario = await auth.validarParaFrontEnd(chave);
            let retorno = {
                id : usuario.usuario[0].id,
                nome : usuario.usuario[0].nome,
                email : usuario.usuario[0].email
            }
            if(usuario){
                res.status(200).json(retorno);
            }else{
                res.status(401).json({msg: "Nao Autorizado"});
            }
        }catch(ex){
            res.status(401).json({msg: "Nao Autorizado"});
        }
    }
    
}