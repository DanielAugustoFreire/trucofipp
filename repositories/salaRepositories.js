import SalaEntity from "../entities/salaEntity.js"
import BaseRepositories from "./baseRepositories.js"

export default class salaRepositories extends BaseRepositories{

    constructor(db){
        super(db)
    }

    async ListarPlayersSalasPeloIdSala(id_sala){
        let sql = `SELECT 
                        s.sal_id,
                        u.usu_nome as player_name,
                        u.usu_id as player_id,
                        p.eqp_id as player_time,
                        e1.eqp_descricao AS eqp_nome_1,
                        e1.eqp_id AS eqp_id_1,
                        e2.eqp_descricao AS eqp_nome_2,
                        e2.eqp_id as eqp_id_2
                    FROM 
                        tb_sala s
                    INNER JOIN 
                        tb_participante p ON s.sal_id = p.sal_id
                    INNER JOIN 
                        tb_usuario u ON u.usu_id = p.usu_id
                    LEFT JOIN 
                        tb_equipe e1 ON e1.eqp_id = s.eqp_id_1
                    LEFT JOIN 
                        tb_equipe e2 ON e2.eqp_id = s.eqp_id_2
                    WHERE 
                        s.sal_id = ?
                        and
                        p.par_dtsaida is null
                    ORDER BY 
						player_time asc;
                        `;

        let value = [id_sala];

        let result = await this.db.ExecutaComando(sql, value);

        return result
    }


    async listarSalas() {
        let sql = `SELECT 
                    s.sal_id as sala_id, 
                    s.sal_nome as sala_name, 
                    p.usu_id as player_id, 
                    p.par_dtsaida as saida,
                    u.usu_nome as player_name, 
                    p.eqp_id as player_time, 
                    e.eqp_descricao as equipe_name,
                    e1.eqp_descricao as equipe_1_name,
                    e2.eqp_descricao as equipe_2_name
                    FROM 
                    tb_sala s
                    LEFT JOIN 
                    tb_participante p ON s.sal_id = p.sal_id
                    LEFT JOIN 
                    tb_usuario u ON u.usu_id = p.usu_id
                    LEFT JOIN 
                    tb_jogo j ON p.sal_id = j.sal_id
                    LEFT JOIN 
                    tb_equipe e ON e.eqp_id = p.eqp_id
                    LEFT JOIN 
                    tb_equipe e1 ON e1.eqp_id = s.eqp_id_1 -- Equipe 1 associada à sala
                    LEFT JOIN 
                    tb_equipe e2 ON e2.eqp_id = s.eqp_id_2 -- Equipe 2 associada à sala
                    WHERE 
                    j.jog_dtfim IS NULL 
                    ORDER BY 
                    p.eqp_id ASC;
                    `;
    
        let result = await this.db.ExecutaComando(sql);
    
        return result;
    }
    

    async criarSala(nome, usuario_id, equipe1, equipe2){
        let sql = "insert into tb_sala (sal_nome, usu_id, eqp_id_1, eqp_id_2) values (?,?,?,?)";

        let value = [nome, usuario_id, equipe1, equipe2]; 

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

    async obterNumeroJogadoresPartidasValidas(sala){
        let sql = "SELECT COUNT(*) as participantes FROM tb_sala s inner join tb_participante p on s.sal_id = p.sal_id where s.sal_id = ? and p.par_dtsaida is null"

        let value = [sala.id];

        let result = await this.db.ExecutaComando(sql, value);

        return result[0]["participantes"];
    }

    async ValidarQuatroJogadores(id){
        let sql = "select count(*) as qtd from tb_participante where sal_id = ? and par_dtsaida is null";

        let value = [id];

        let result = await this.db.ExecutaComando(sql, value);

        return result[0]["qtd"] == 4;
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