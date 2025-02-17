import BaseEntity from "./baseEntity.js";
import MaoRepositorie from "../repositories/maoRepositorie.js";

export default class MaoEntity extends BaseEntity{

    #id;
    #ordem;
    #codigo_baralho;
    #mao_trucada;
    #mao_valor
    #jogo_id;
    #equipe_vencedora_id;

    get id(){ return this.#id; } set id(id){ this.#id = id; }
    get ordem(){ return this.#ordem; } set ordem(ordem){ this.#ordem = ordem; }
    get codigo_baralho(){ return this.#codigo_baralho; } set codigo_baralho(codigo_baralho){ this.#codigo_baralho = codigo_baralho; }
    get mao_trucada(){ return this.#mao_trucada; } set mao_trucada(mao_trucada){ this.#mao_trucada = mao_trucada; }
    get mao_valor(){ return this.#mao_valor; } set mao_valor(mao_valor){ this.#mao_valor = mao_valor; }
    get jogo_id(){ return this.#jogo_id; } set jogo_id(jogo_id){ this.#jogo_id = jogo_id; }
    get equipe_vencedora_id(){ return this.#equipe_vencedora_id; } set equipe_vencedora_id(equipe_vencedora_id){ this.#equipe_vencedora_id = equipe_vencedora_id; }

    constructor(id, ordem, codigo_baralho, mao_trucada, mao_valor, jogo_id, equipe_vencedora_id){
        super();
        this.#id = id;
        this.#ordem = ordem;
        this.#codigo_baralho = codigo_baralho;
        this.#mao_trucada = mao_trucada;
        this.#mao_valor = mao_valor;
        this.#jogo_id = jogo_id;
        this.#equipe_vencedora_id = equipe_vencedora_id;
    }

    async InserirMao(banco){
        let maoRepository = new MaoRepositorie(banco);
        let result = await maoRepository.inserirMao(this);
        return result;
    }

}