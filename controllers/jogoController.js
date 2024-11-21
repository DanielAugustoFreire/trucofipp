import Database from "../db/database.js";
import JogoEntity from "../entities/jogoEntity.js";
import JogoRepository from "../repositories/jogoRepository.js";
import SalaEntity from "../entities/salaEntity.js";
import SalaRepository from "../repositories/salaRepositories.js";

export default class JogoController{

    async IniciarJogo(req,res){
        let banco = new Database();
        await banco.AbreTransacao();
        try{
            let idSala = req.params.idSala;
            if(idSala){
                let jogoEntity = new JogoEntity("", "", "", idSala);
                jogoEntity.jogo_inicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
                let sala = new SalaEntity(idSala, "", "");
                let salaRepo = new SalaRepository(banco);
                let salaValidacao = await salaRepo.obterSalaPorId(sala);
                let numeroJogadores = await salaRepo.obterNumeroJogadores(sala);
                if(salaValidacao.length > 0){
                    if(numeroJogadores == 4){
                        let repo = new JogoRepository(banco);
                        let jogo = await repo.iniciarJogo(jogoEntity);
        
                        if(jogo){
                            await banco.Commit();
                            res.status(200).json(jogo);
                        }
                    }else{
                        res.status(400).json({msg: "Sala não possui 4 jogadores"});
                    }
 
                }else{
                    res.status(400).json({msg: "Sala não encontrada"});
                    return;
                }


            }else{
                res.status(400).json({msg: "Id da sala não informado"});
            }
        }catch(ex){
            await banco.Rollback();
            res.status(500).json({msg: "Erro ao iniciar partida ->", erro: ex});
        }
    }

}
