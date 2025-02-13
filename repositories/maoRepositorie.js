import BaseRepository from "./baseRepositories.js";

export default class MaoRepositorie extends BaseRepository {
   
    constructor(db) {
        super(db);
    }   

    async inserirMao(mao){
        let sql = "insert into tb_mao(mao_ordem, mao_codigobaralho, jog_id) values(?,?,?)";
        let values = [mao.ordem, mao.codigo_baralho, mao.jogo_id];
        let result = await this.db.ExecutaComandoLastInserted(sql, values);
        return result;
    }

    
}