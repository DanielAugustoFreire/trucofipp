import ParticipanteRepository from "../repositories/participanteRepositorie.js";
import BaseEntity from "./baseEntity.js";
import Database from "../db/database.js";


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
    
    async ObterIdParticipante(usu_id){
        const db = Database.getInstance();
        const participanteRepo = new ParticipanteRepository(db);
        let resultado = await participanteRepo.ObterIdParticipante(usu_id);
        return resultado;
    }

    async ValidarJogadorSala(){
        const db = Database.getInstance();
        const participanteRepo = new ParticipanteRepository(db);
        let resultado = await participanteRepo.ValidarJogadorSala(this);
        return resultado;
    }

    async ValidarJogadorNaoTemSala(id, db){
        const participanteRepo = new ParticipanteRepository(db);
        const resultado = await participanteRepo.ValidarJogadorNaoTemSala(id);
        return resultado;
    }

    async inserirParticipante(usuario_id, sala_id, equipe_id, db){
        const participanteRepo = new ParticipanteRepository(db);
        this.#dataEntrada = new Date();
        this.#dataSaida = null;
        this.id = usuario_id;
        this.id_sala = sala_id;
        this.id_equipe = equipe_id;
        let resultado = await participanteRepo.inserirParticipantePartidaPeloIdSala(this);
        return resultado;
    }

    async SairSala(id){
        const db = Database.getInstance();
        const participanteRepo = new ParticipanteRepository(db);
        let resultado = await participanteRepo.SairSala(id);
        return resultado;;
    }

}
