import Database from "../db/database";
import JogoEntity from "../entities/jogoEntity.js";
import JogoRepository from "../repositories/jogoRepository.js";


export default class JogoController{

    async IniciarJogo(req,res){
        let banco = new Database();
        await banco.AbreTransacao();
        try{
            let idSala = req.params.idSala;
            if(idSala){
                let jogoEntity = new JogoEntity("", "", "", idSala);
                jogoEntity.jogo_inicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
                let repo = new JogoRepository(banco);
                let jogo = await repo.IniciarJogo(jogoEntity);

                if(jogo){
                    await banco.Commit();
                    res.status(200).json(jogo);
                }
            }else{
                res.status(400).json({mensagem: "Id da sala não informado"});
            }
        }catch(ex){
            await banco.Rollback();
            res.status(500).json({mensagem: "Erro ao iniciar partida ->", erro: ex});
        }
    }

}
