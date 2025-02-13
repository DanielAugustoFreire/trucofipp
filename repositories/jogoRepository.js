import BaseRepository from "./baseRepositories.js";


export default class JogoRepository extends BaseRepository{

    constructor(db){
        super(db)
    }

    async iniciarJogo(jogo){
        let sql = "INSERT INTO tb_jogo (jog_dtinicio, sal_id) VALUES (?, ?)";

        let values = [jogo.jogo_inicio, jogo.sala];

        let result = await this.db.ExecutaComandoLastInserted(sql, values);

        return result;
    }

    async buscarJogoPorIdJogo(jogo_id){
        let sql = "SELECT * FROM tb_jogo WHERE jog_id = ?";

        let values = [jogo_id];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

    async VerificarSeOJogoExiste(jogo){
        let sql = "SELECT jog_id FROM tb_jogo WHERE sal_id = ? and jog_dtfim is null";

        let values = [jogo];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

    async buscarIdsParticipantesDeterminadoJogo(jogo_id){
        let sql = `SELECT 
                        p.par_id
                    FROM 
                        tb_participante p
                    INNER JOIN 
                        tb_jogo j ON p.sal_id = j.sal_id
                    WHERE 
                        j.jog_id = ?
                        and 
                        p.par_dtsaida is null`;

        let values = [jogo_id];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }
}