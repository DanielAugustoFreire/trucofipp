import BaseEntity from "./baseEntity.js";


export default class JogoEntity extends BaseEntity{

    #id;
    #jogo_inicio;
    #jogo_fim;
    #sala;

    get id() {return this.#id;}                     
    set id(value) {this.#id = value;}

    get jogo_inicio() {return this.#jogo_inicio;}   
    set jogo_inicio(value) {this.#jogo_inicio = value;}

    get jogo_fim() {return this.#jogo_fim;}         
    set jogo_fim(value) {this.#jogo_fim = value;}

    get sala() {return this.#sala;}                 
    set sala(value) {this.#sala = value;}

    constructor( id, jogo_inicio, jogo_fim, sala){
        super();
        this.#id = id;
        this.#jogo_inicio = jogo_inicio;
        this.#jogo_fim = jogo_fim;
        this.#sala = sala;
    }


}