import BaseEntity from "./baseEntity.js"


export default class SalaEntity extends BaseEntity{
    #id
    #nome
    #usuario_id

    get id(){ return this.#id }
    set id(id){ this.#id = id }

    get nome(){ return this.#nome }
    set nome(nome){ this.#nome = nome }

    get usuario_id(){ return this.#usuario_id }
    set usuario_id(usuario_id){ this.#usuario_id = usuario_id }

    constructor(id, nome, usuario_id){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#usuario_id = usuario_id;
    }

}