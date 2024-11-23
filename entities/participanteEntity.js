import BaseEntity from "./baseEntity.js";


export default class ParticipanteEntity extends BaseEntity{

    #dataEntrada;
    #dataSaida;
    #par_id;
    #usu_id;
    #id_sala;
    #id_equipe;

    get dataEntrada() { return this.#dataEntrada; }                           set dataEntrada(value) { this.#dataEntrada = value; }
    get dataSaida() { return this.#dataSaida; }                     set dataSaida(value) { this.#dataSaida = value; }
    get par_id() { return this.#par_id; }                     set par_id(value) { this.#par_id = par_id; }
    get usu_id() { return this.#usu_id; }                     set usu_id(value) { this.#usu_id = usu_id; }
    get id_sala() { return this.#id_sala; }                       set id_sala(value) { this.#id_sala = value; }
    get id_equipe() { return this.#id_equipe; }                       set id_equipe(value) { this.#id_equipe = value; }

    constructor(dataEntrada, dataSaida, par_id, usu_id, id_sala, id_equipe){
        super();
        this.#dataEntrada = dataEntrada
        this.#dataSaida = dataSaida
        this.#par_id = par_id
        this.#usu_id = usu_id
        this.#id_sala = id_sala
        this.#id_equipe = id_equipe
    }

}
