import Database from "../db/database.js";
import JogoEntity from "../entities/jogoEntity.js";
import JogoRepository from "../repositories/jogoRepository.js";
import SalaEntity from "../entities/salaEntity.js";
import SalaRepository from "../repositories/salaRepositories.js";

export default class JogoController{

    async IniciarJogo(req,res){
        let banco = Database.getInstance();
        await banco.AbreTransacao();
        try{
            let idSala = req.params.idSala;
            if(idSala){
                let jogoEntity = new JogoEntity("", "", "", idSala);
                jogoEntity.jogo_inicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
                let sala = new SalaEntity(idSala, "", "");
                let salaRepo = new SalaRepository(banco);
                let salaValidacao = await salaRepo.obterSalaPorId(sala);
                let numeroJogadores = await salaRepo.obterNumeroJogadoresPartidasValidas(sala);
                if(!salaValidacao.length > 0){
                    res.status(400).json({msg: "Sala não encontrada"});
                    return;
                }
                if(numeroJogadores != 4){
                    res.status(400).json({msg: "Sala não possui 4 jogadores"});
                    return;
                }else{
                    let repo = new JogoRepository(banco);
                    let jogo = await repo.iniciarJogo(jogoEntity);
    
                    if(jogo){
                        await banco.Commit();
                        res.status(200).json( jogo );
                    }
                }
            }else{
                res.status(400).json({msg: "Id da sala não informado"});
            }
        }catch(ex){
            await banco.Rollback();
            res.status(500).json({msg: "Erro ao iniciar partida ->"});
        }
    }

    async VerificarSeOJogoExiste(req,res){
        try{
            let idSala = req.params.idSala;
            if(idSala){
                let jogoEnt = new JogoEntity();
                let retorno = await jogoEnt.VerificarSeOJogoExiste(idSala);
                if(retorno.length > 0){
                    res.status(200).json(retorno);
                }else{
                    res.status(404).json({msg: "Jogo não encontrado"});
                }
            }else{
                res.status(400).json({msg: "Id da sala não informado"});
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao buscar jogo ->"});
        }
    }

    async buscarIdsParticipantesDeterminadoJogo(req,res){
        try{
            let idJogo = req.params.idJogo;
            if(idJogo){
                let jogoEnt = new JogoEntity();
                let retorno = await jogoEnt.buscarIdsParticipantesDeterminadoJogo(idJogo);
                if(retorno.length > 0){
                    res.status(200).json(retorno);
                }else{
                    res.status(404).json({msg: "Ids não encontrados"});
                }
            }else{
                res.status(400).json({msg: "Id do jogo não informado"});
            }
        }catch(ex){
            res.status(500).json({msg: "Erro ao buscar ids dos participantes ->"});
        }
    }
}
