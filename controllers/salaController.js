import salaRepositories from '../repositories/salaRepositories.js';
import Database from '../db/database.js';

export default class salaController{

    async listarSalas(req,res){
        try{
            let repo = new salaRepositories();
            let salas = await repo.listarSalas();
            if(salas){
                res.status(200).json(salas);
            }
            else{
                throw new Error("Erro ao listar salas");
            }
        }catch(ex){
            res.status(500).json({mensagem: "Erro ao listar salas", erro: ex});
        }
    }

    async listarPlayers(req,res){
        
    }

    async criarSala(req,res){
        let banco = new Database();
        await banco.AbreTransacao();
        try{
            let repo = new salaRepositories(banco)
            let {nome, usuario_id} = req.body;
            let salaExiste = await repo.obterPorNome(nome);
            if(salaExiste){
                await banco.Rollback();
                res.status(400).json({mensagem: "Sala já existe"});
            }
            let criarSala = await repo.criarSala(nome, usuario_id);
            if(criarSala){
                await banco.Commit();
                res.status(201).json({mensagem: "Sala criada com sucesso"});
            }
            else{
                throw new Error();
            }
        }
        catch(ex){
            await banco.Rollback();
            res.status(500).json({mensagem: "Erro ao criar sala", erro: ex});
        }
    }

}