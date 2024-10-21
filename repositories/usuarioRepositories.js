import BaseRepositories from './baseRepositories.js';
import UsuarioEntitie from '../entities/usuarioEntitie.js';

export default class UsuarioRepositorie extends BaseRepositories{
    
    constructor(db){
        super(db)
    }

    async listar(){
        let sql = "select * from tb_usuario"
        let result = banco.ExecutaComando(sql)

        return this.toMap(result);
    }

    async obter(id){
        let sql = "select * from tb_usuario where usu_id = ?"
        let value = [id];

        let result = await this.db.ExecutaComando(sql, value);

        return this.toMap(result)
    }

    async obterPorEmail(email){
        let sql = "select count(*) as qtd from tb_usuario where usu_email = ?";

        let value = [email];

        let result = await this.db.ExecutaComando(sql, value);

        return result[0]["qtd"] > 0;
    }
    
    async validarAcesso(email, senha) {

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let valores = [email, senha];

        let row = await this.db.ExecutaComando(sql, valores);

        return this.toMap(row, false);
    }

    async inserir(usuario) {
        
        let sql = "insert into tb_usuario(usu_nome, usu_email, usu_senha) values(?,?,?)";
        let valores = [usuario.nome, usuario.email, usuario.senha];

        let result = await this.db.ExecutaComandoLastInserted(sql,valores);

        return result;
    }

    toMap(rows) {
        
        
        if(typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let usuario = new UsuarioEntitie();
                usuario.id = row["usu_id"];
                usuario.nome = row["usu_nome"];
                usuario.email = row["usu_email"];
                usuario.senha = row["usu_senha"];
    
                lista.push(usuario);
            }

            return lista;
        }
        else{
            let usuario = new UsuarioEntitie();
            usuario.id = rows["usu_id"];
            usuario.nome = rows["usu_nome"];
            usuario.email = rows["usu_email"];
            usuario.senha = rows["usu_senha"];

            return usuario;
        }
    }
}