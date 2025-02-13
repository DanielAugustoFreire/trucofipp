import BaseRepository from "./baseRepositories.js";

export default class ParticipanteRepository extends BaseRepository{

    constructor(banco){
        super(banco);
    }

    async ObterIdParticipante(usu_id){
        let sql = 'select par_id from tb_participante where usu_id = ? and par_dtsaida is null';

        let values = [usu_id]

        let result = await this.db.ExecutaComando(sql, values);

        return result[0].par_id;
    }

    async inserirParticipantePartidaPeloIdSala(participanteEntity){

        let sql = 'insert into tb_participante (par_dtentrada, par_dtsaida, usu_id, sal_id, eqp_id) values (?, ?, ?, ?, ?)'

        let values = [participanteEntity.dataEntrada, participanteEntity.dataSaida, participanteEntity.id, participanteEntity.id_sala, participanteEntity.id_equipe]

        let result = await this.db.ExecutaComando(sql, values);

        return result;

    }

    async ValidarJogadorSala(Entidade){
        let sql = `WITH usuario AS (
                        SELECT *
                        FROM tb_participante
                        WHERE usu_id = ?

                        AND par_dtsaida IS NULL
                    )
                    SELECT COUNT(*) as ok
                    FROM tb_jogo
                    WHERE sal_id IN (
                        SELECT sal_id
                        FROM usuario
                    );`

        let values = [Entidade.id]

        let result = await this.db.ExecutaComando(sql, values);

        return result[0].ok;
    }

    async ValidarJogadorNaoTemSala(id){
        let sql = `select count(*) as ok, p.sal_id as sala_id, j.jog_id
                    from 
                        tb_participante p
                    left join 
                        tb_jogo j on j.sal_id = p.sal_id
                    where
                        p.usu_id = ? and p.par_dtsaida is null and j.jog_dtfim is null`;

        let values = [id]

        let result = await this.db.ExecutaComando(sql, values);

        return result[0];
    }
    
    async SairSala(id){
        let sql = "update tb_participante set par_dtsaida = now() where usu_id = ? and par_dtsaida is null";

        let values = [id]

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }
        
}