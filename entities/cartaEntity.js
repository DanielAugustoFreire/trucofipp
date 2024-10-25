import Database from "../db/database.js"
import BaseEntity from "./baseEntity.js";

const banco = new Database()

export default class CartaEntity extends BaseEntity{

    #id;
    #cod_carta;
    #imagem_carta;
    #carta_valor;
    #carta_naipe;
    #vira;
    #par_id;


    get id() { return this.#id; }                           set id(value) { this.#id = value; }
    get cod_carta() { return this.#cod_carta; }                     set cod_carta(value) { this.#cod_carta = value; }
    get imagem_carta() { return this.#imagem_carta; }                       set imagem_carta(value) { this.#imagem_carta = value; }
    get carta_valor() { return this.#carta_valor; }                       set carta_valor(value) { this.#carta_valor = value; }
    get carta_naipe() { return this.#carta_naipe; }                       set carta_naipe(value) { this.#carta_naipe = value; }
    get vira() { return this.#vira; }                       set vira(value) { this.#vira = value; }
    get par_id() { return this.#par_id; }                       set par_id(value) { this.#par_id = value; }




    constructor(id, cod_carta, imagem_carta, carta_valor, carta_naipe, vira, par_id){
        super();
        this.#id = id
        this.#cod_carta = cod_carta
        this.#imagem_carta = imagem_carta
        this.#carta_valor = carta_valor
        this.#carta_naipe = carta_naipe
        this.#vira = vira
        this.#par_id = par_id
    }

}
