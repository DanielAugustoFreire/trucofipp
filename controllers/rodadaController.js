import RodadaEntity from "../entities/rodadaEntity.js";
import Database from "../db/database.js";

export default class RodadaController {

    async IniciarRodada(req,res){
        let banco = Database.getInstance();
        await banco.AbreTransacao()
        try{
            const mao_id = req.params.mao_id;
            let Rodada = new RodadaEntity(null, mao_id, null);
            let retorno = await Rodada.IniciarRodada(banco);
            if(retorno){
                await banco.Commit()
                res.status(200).json(retorno);
            }else{
                await banco.Rollback()
                res.status(404).send({message: "Erro ao iniciar rodada"});
            }
        }catch(err){
            await banco.Rollback()
            res.status(500).send({message: "Erro ao iniciar rodada"});
        }
    }

}