import SalaEntity from "../entities/salaEntity.js"
import BaseRepositories from "./baseRepositories.js"

export default class salaRepositories extends BaseRepositories{

    constructor(db){
        super(db)
    }

    async listarSalas(){
        let sql = "select * from tb_sala";

        let result = await this.db.ExecutaComando(sql);

        return this.toMap(result);
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