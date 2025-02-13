import Database from "../db/database.js";
import MovimetacaoEntity from "../entities/movimentacaoEntity.js";

export default class movimentacaoController{

    async registrarMovimento(req,res){
        let banco = Database.getInstance();
        await banco.AbreTransacao()
        try{
            let { ordem, carta_id, rodada_id, par_id } = req.body;
            let movimento = new MovimetacaoEntity(null, ordem, null, null, carta_id, rodada_id, par_id);
            let retorno = await movimento.registrarMovimento(banco);
            if(retorno){
                await banco.Commit()
                res.status(200).json(retorno);
            }else{
                await banco.Rollback()
                res.status(404).send({message: "Erro ao registrar movimento"});
            }
        }catch(err){
            await banco.Rollback()
            res.status(500).send({message: "Erro ao registrar movimento"});
        }
    }

}