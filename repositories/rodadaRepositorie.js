import BaseRepository from "./baseRepositories.js";


export default class RodadaRepositorie extends BaseRepository {
    
    constructor(db){
        super(db)
    }

    async IniciarRodada(rodada){
        let sql = "INSERT INTO tb_rodada (mao_id) VALUES (?)";

        let values = [rodada.mao_id];

        let retorno = await this.db.ExecutaComandoLastInserted(sql, values);

        return retorno;
    }
}
