import Database from "../db/database.js"
import BaseEntity from "./baseEntity.js";

const banco = new Database()

export default class ParticipanteEntity extends BaseEntity{

    #dataEntrada;
    #dataSaida;
    #id;
    #id_sala;
    #id_equipe;

    get dataEntrada() { return this.#dataEntrada; }                           set dataEntrada(value) { this.#dataEntrada = value; }
    get dataSaida() { return this.#dataSaida; }                     set dataSaida(value) { this.#dataSaida = value; }
    get id() { return this.#id; }                     set id(value) { this.#id = value; }
    get id_sala() { return this.#id_sala; }                       set id_sala(value) { this.#id_sala = value; }
    get id_equipe() { return this.#id_equipe; }                       set id_equipe(value) { this.#id_equipe = value; }

    constructor(dataEntrada, dataSaida, id, id_sala, id_equipe){
        super();
        this.#dataEntrada = dataEntrada
        this.#dataSaida = dataSaida
        this.#id = id
        this.#id_sala = id_sala
        this.#id_equipe = id_equipe
    }

}
