import BaseRepository from "./baseRepositories.js";


export default class JogoRepository extends BaseRepository{

    constructor(db){
        super(db)
    }

    async iniciarPartida(jogo){
        let sql = "INSERT INTO tb_jogo (jog_dtinicio, sal_id) VALUES (?, ?)";

        let values = [jogo.jogo_inicio, jogo.sala];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

}