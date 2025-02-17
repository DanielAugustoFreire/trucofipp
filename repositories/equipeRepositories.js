import EquipeEntity from "../entities/equipeEntity.js";
import BaseRepository from "./baseRepositories.js"

export default class equipeRepositories extends BaseRepository{

    constructor(db){
        super(db)
    }

    async CriarEquipe(descricao){
        let sql = "insert into tb_equipe (eqp_descricao) values (?)";

        let value = [descricao];

        let result = await this.db.ExecutaComandoLastInserted(sql, value);

        return result
    }

    async listarExclusivamenteEquipes(id){
        let sql = `SELECT DISTINCT 
                    e.eqp_descricao AS eqp_name, 
                    e.eqp_id
                FROM 
                    tb_equipe e
                LEFT JOIN 
                    tb_sala s 
                    ON s.eqp_id_1 = e.eqp_id OR s.eqp_id_2 = e.eqp_id
                LEFT JOIN 
                    tb_participante p 
                    ON p.eqp_id = e.eqp_id
                WHERE 
                    s.sal_id = ?
                GROUP BY 
                    e.eqp_descricao, e.eqp_id
                ORDER BY 
                    e.eqp_id ASC;
                `
        let value = [id];

        let result = await this.db.ExecutaComando(sql, value);

        return result;
    }


    async ListarEquipesPeloIdSala(id_sala){
        let sql = `SELECT DISTINCT 
                    e.eqp_descricao AS eqp_name, 
                    e.eqp_id,
                    COUNT(p.par_id) AS num_participantes
                FROM 
                    tb_equipe e
                LEFT JOIN 
                    tb_sala s 
                    ON s.eqp_id_1 = e.eqp_id OR s.eqp_id_2 = e.eqp_id
                LEFT JOIN 
                    tb_participante p 
                    ON p.eqp_id = e.eqp_id
                WHERE 
                    s.sal_id = ? and
                    p.par_dtsaida is null
                GROUP BY 
                    e.eqp_descricao, e.eqp_id
                ORDER BY 
                    e.eqp_id ASC;
                ;
`

        let value = [id_sala];

        let result = await this.db.ExecutaComando(sql, value);

        return result
    }

}
