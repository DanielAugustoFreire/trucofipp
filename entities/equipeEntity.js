import Database from "../db/database.js";
import equipeRepositories from "../repositories/equipeRepositories.js";
import BaseEntity from "./baseEntity.js";


export default class EquipeEntity extends BaseEntity{

    #id;
    #descricao;

    get id(){ return this.#id; }
    set id(value){ this.#id = value; }

    get descricao(){ return this.#descricao; }
    set descricao(value){ this.#descricao = value; }

    constructor(id, descricao){
        super();
        this.#id = id;
        this.#descricao = descricao;
    }

    async criarEquipe(equipe1, equipe2, banco){
        let equipeRepositorie = new equipeRepositories(banco);
        let result = await equipeRepositorie.CriarEquipe(equipe1);
        let result2 = await equipeRepositorie.CriarEquipe(equipe2);

        if(result && result2){
            return [result, result2];
        }
        
        return false;
    }

    async ListarEquipesPeloIdSala(id_sala){
        let banco = Database.getInstance();
        let equipeRepositorie = new equipeRepositories(banco);
        let equipes = await equipeRepositorie.ListarEquipesPeloIdSala(id_sala);
        return equipes;
    }

    async ListarEquipesExclusivamentePeloIdSala(id_sala){
        let banco = Database.getInstance();
        let equipeRepositorie = new equipeRepositories(banco);
        let equipes = await equipeRepositorie.listarExclusivamenteEquipes(id_sala);
        return equipes;
    }

}