import SalaEntity from "../entities/salaEntity.js"
import BaseRepositories from "./baseRepositories.js"

export default class salaRepositories extends BaseRepositories{

    constructor(db){
        super(db)
    }
    async listarSalas() {
        let sql = `SELECT s.sal_id as sala_id, s.sal_nome as sala_name, p.usu_id as player_id, u.usu_nome as player_name, p.eqp_id as player_time 
                   FROM tb_sala s 
                   left JOIN tb_participante p ON s.sal_id = p.sal_id 
                   left JOIN tb_usuario u ON u.usu_id = p.usu_id
                   left JOIN tb_jogo j ON p.sal_id = j.sal_id
                   WHERE j.jog_dtfim IS NULL
                   ORDER BY s.sal_id ASC`;
    
        let result = await this.db.ExecutaComando(sql);
    
        let retorno = [];
        let currentSala = null;
    
        for (let i = 0; i < result.length; i++) {
            if (!currentSala || currentSala.sala_id !== result[i].sala_id) {
                if (currentSala) {
                    retorno.push(currentSala);
                }
    
                currentSala = {
                    sala_id: result[i].sala_id,
                    sala_name: result[i].sala_name,
                    players: []
                };
            }
    
            currentSala.players.push({
                player_id: result[i].player_id,
                player_name: result[i].player_name,
                player_time: result[i].player_time
            });
        }
    
        if (currentSala) {
            retorno.push(currentSala);
        }
    
        return retorno;
    }
    

    async criarSala(nome, usuario_id){
        let sql = "insert into tb_sala (sal_nome, usu_id) values (?,?)";

        let value = [nome, usuario_id]; 

        let result = await this.db.ExecutaComandoLastInserted(sql, value);

        return result;
    }

    async obterPorNome(nome){
        let sql = "select count(*) as qtd from tb_sala where sal_nome = ?";

        let value = [nome];

        let result = await this.db.ExecutaComando(sql, value);

        return result[0]["qtd"] > 0;
    }

    async obterSalaPorId(sala){
        //let sql = "SELECT * FROM tb_sala s inner join tb_participante p on s.sal_id = p.sal_id where s.sal_id = ?"; 

        let sql = "SELECT * FROM tb_sala where sal_id = ?";

        let value = [sala.id];

        let result = await this.db.ExecutaComando(sql, value);

        return this.toMap(result);
    }

    async obterNumeroJogadores(sala){
        let sql = "SELECT COUNT(*) as participantes FROM tb_sala s inner join tb_participante p on s.sal_id = p.sal_id where s.sal_id = ?"

        let value = [sala.id];

        let result = await this.db.ExecutaComando(sql, value);

        return result[0]["participantes"];
    }

    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let sala = new SalaEntity();
                sala.id = row["sal_id"];
                sala.nome = row["sal_nome"];
                sala.usuario_id = row["usu_id"];
    
                lista.push(sala);
            }

            return lista;
        }
        else{
            let sala = new SalaEntity();
            sala.id = rows["sal_id"];
            sala.nome = rows["sal_nome"];
            sala.usuario_id = rows["usu_id"];

            return sala;
        }
    }
}