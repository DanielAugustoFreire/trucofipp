import ParticipanteEntity from "../entities/participanteEntity";
import BaseRepository from "./baseRepositories";

export default class ParticipanteRepository extends BaseRepository{

    constructor(banco){
        super(banco);
    }

    async inserirParticipantePartidaPeloIdSala(participanteEntity){
        let sql = 'insert into tb_participante (par_dtentrada, par_dtsaida, usu_id, sal_id, eqp_id)'

        let values = [participanteEntity.dataEntrada, participanteEntity.dataSaida, participanteEntity.id, participanteEntity.id_sala, participanteEntity.id_equipe]
    }
        
    async verificarParticipantePartidaPeloIdSala(participanteEntity){
        let sql = 'select * from tb_participante where usu_id = ? and sal_id = ? and par_dtsaida is null'

        let values = [participanteEntity.par_id, participanteEntity.id_sala]

        let result = await this.banco.query(sql, values)

        return this.toMap(result)
    }

    

}