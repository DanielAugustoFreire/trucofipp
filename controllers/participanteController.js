import Database from "../db/database.js"
import ParticipanteEntity from "../entities/participanteEntity.js"

export default class ParticipanteController{

    async ValiadrParticipanteDisponivel(req,res){
        let banco = Database.getInstance()
        try{
            let participante = new ParticipanteEntity();
            let id = req.params.user_id;
            let retorno = await participante.ValidarJogadorNaoTemSala(id, banco);
            if(retorno.ok != 0){
                let retornar = {
                    ok: retorno.ok,
                    sala_id: retorno.sala_id,
                    jogo_id: retorno.jog_id
                }
                res.status(200).json(retornar);
            }else{
                res.status(200).json({msg: "Jogador não está em uma sala"});
            }
        }catch(ex){
            res.status(500).json({message: "Erro Interno"});
        }
    }

    async SairSala(req,res){
        try{
            let participante = new ParticipanteEntity();
            let id = req.params.user_id;
            let retorno = await participante.SairSala(id);
            if(retorno){
                res.status(200).json({message: "Jogador saiu da sala"});
            }else{
                res.status(404).json({message: "Jogador não está em uma sala"});
            }
        }catch(ex){
            res.status(500).json({message: "Erro Interno"});
        }
    }

    async ObterIdPar(req,res){
        try{
            let usu_id = req.params.usu_id;
            let participante = new ParticipanteEntity();
            let retorno = await participante.ObterIdParticipante(usu_id);
            if(retorno){
                res.status(200).json(retorno);
            }else{
                res.status(404).json({message: "Jogador não find"});
            }
        }catch(ex){
            res.status(500).json({message: "Erro Interno"});
        }

    }
}