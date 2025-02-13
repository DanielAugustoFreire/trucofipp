import RodadaRepositorie from "../repositories/rodadaRepositorie.js";
import BaseEntity from "./baseEntity.js";


export default class RodadaEntity extends BaseEntity{

    #id;
    #mao_id;
    #eqp_vencedora;

    get id(){ return this.#id; } set id(value){ this.#id = value; }
    get mao_id(){ return this.#mao_id; } set mao_id(value){ this.#mao_id = value; }
    get eqp_vencedora(){ return this.#eqp_vencedora; } set eqp_vencedora(value){ this.#eqp_vencedora = value; }

    constructor(id, mao_id, eqp_vencedora){
        super();
        this.#id = id;
        this.#mao_id = mao_id;
        this.#eqp_vencedora = eqp_vencedora;
    }

    async IniciarRodada(banco){
        let rodadaRepo = new RodadaRepositorie(banco);
        let retorno = await rodadaRepo.IniciarRodada(this);
        return retorno;
    }

}