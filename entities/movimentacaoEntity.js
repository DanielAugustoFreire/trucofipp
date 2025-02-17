import BaseEntity from "./baseEntity.js";
import MovimentoRepositorie from "../repositories/movimentoRepositorie.js";
import Database from "../db/database.js";

export default class MovimetacaoEntity extends BaseEntity{

    #id_movimentacao;
    #ordem_movimentacao;
    #correu_movimentacao;
    #truco_movimentacao;
    #carta_id;
    #rodada_id;
    #par_id;


    get id_movimentacao() { return this.#id_movimentacao; }                           set id_movimentacao(value) { this.#id_movimentacao = value; }
    get ordem_movimentacao() { return this.#ordem_movimentacao; }                     set ordem_movimentacao(value) { this.#ordem_movimentacao = value; }
    get correu_movimentacao() { return this.#correu_movimentacao; }                       set correu_movimentacao(value) { this.#correu_movimentacao = value; }
    get truco_movimentacao() { return this.#truco_movimentacao; }                       set truco_movimentacao(value) { this.#truco_movimentacao = value; }
    get carta_id() { return this.#carta_id; }                       set carta_id(value) { this.#carta_id = value; }
    get rodada_id() { return this.#rodada_id; }                       set rodada_id(value) { this.#rodada_id = value; }
    get par_id() { return this.#par_id; }                       set par_id(value) { this.#par_id = value; }

    constructor(id_movimentacao, ordem_movimentacao, correu_movimentacao, truco_movimentacao, carta_id, rodada_id, par_id){
        super();
        this.#id_movimentacao = id_movimentacao
        this.#ordem_movimentacao = ordem_movimentacao
        this.#correu_movimentacao = correu_movimentacao
        this.#truco_movimentacao = truco_movimentacao
        this.#carta_id = carta_id
        this.#rodada_id = rodada_id
        this.#par_id = par_id
    }

    async registrarMovimento(banco){
        let movimentoRepo = new MovimentoRepositorie(banco);
        let retorno = await movimentoRepo.registrarMovimento(this);
        return retorno;
    }

    async consultarMovimentos(par_id){
        let banco = Database.getInstance();
        let movimentoRepo = new MovimentoRepositorie(banco);
        let retorno = await movimentoRepo.consultarMovimentos(par_id);
        return retorno;
    }

}
