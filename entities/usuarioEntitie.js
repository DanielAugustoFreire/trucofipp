import Database from "../db/database.js"
import BaseModel from "./baseModel.js";

const banco = new Database()

export default class UsuarioEntitie extends BaseModel{

    #id;
    #email;
    #senha;
    #nome;

    get id() { return this.#id; }                           set id(value) { this.#id = value; }
    get email() { return this.#email; }                     set email(value) { this.#email = value; }
    get senha() { return this.#senha; }                     set senha(value) { this.#senha = value; }
    get nome() { return this.#nome; }                       set nome(value) { this.#nome = value; }

    constructor(id, email, senha, nome){
        super();
        this.#id = id
        this.#email = email
        this.#senha = senha
        this.#nome = nome
    }

}
