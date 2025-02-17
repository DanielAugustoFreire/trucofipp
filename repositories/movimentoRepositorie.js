import BaseRepository from "./baseRepositories.js";


export default class MovimentoRepositorie extends BaseRepository{
    
    constructor(db) {
        super(db)
    }
    
    async registrarMovimento(movimento){
        let sql = "INSERT INTO tb_movimentacao (mov_ordem, car_id, rod_id, par_id) VALUES (?,?,?,?)";

        let params = [movimento.ordem_movimentacao, movimento.carta_id, movimento.rodada_id, movimento.par_id];

        let retorno = await this.db.ExecutaComando(sql, params);

        return retorno;
    }

    async consultarMovimentos(par_id){
        let sql = "select * from tb_movimentacao where par_id = ?"

        let params = [par_id];

        let retorno = await this.db.ExecutaComando(sql, params);

        return retorno;
    }

}