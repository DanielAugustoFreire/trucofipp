import CartaRepositories from "../repositories/cartaRepositories.js";
import BaseEntity from "./baseEntity.js";


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

    async obterCartaPorIdJogo(jogo_id){
        let cartaRepo = new CartaRepositories();
        let carta = await cartaRepo.obterCartaPorIdJogo(jogo_id);
        let retorno = {
            vira: '',
            cards: [],
            mao_id: carta[0].mao_id
        }
        for(let i = 0; i < carta.length; i++){
            if(carta[i].car_vira == 1){
                retorno.vira = carta[i];
            }else{
                retorno.cards.push(carta[i]);
            }
        }


        return retorno;
    }

    async obter13Cartas(){
        let cartaRepo = new CartaRepositories();
        let cartas = await cartaRepo.obter13Cartas();
        return cartas;
    }
    
    rearanjarCartas(deck) {
        let valueVira = this.toMap(deck[0]);

        let obj_retorno = {
            vira: valueVira,
            deck_jogador1: [],
            deck_jogador2: [],
            deck_jogador3: [],
            deck_jogador4: []
        }

        let cartas = this.toMap(deck);

        for (let i = 1; i < cartas.length; i++) {
            if (i % 4 === 1) {
                obj_retorno.deck_jogador1.push(cartas[i]);
            } else if (i % 4 === 2) {
                obj_retorno.deck_jogador2.push(cartas[i]);
            } else if (i % 4 === 3) {
                obj_retorno.deck_jogador3.push(cartas[i]);
            } else if (i % 4 === 0) {
                obj_retorno.deck_jogador4.push(cartas[i]);
            }
        }

        return obj_retorno;
    }

    preencher(carta){
        let retorno = {
            carta_id : carta.id,
            cod_carta: carta.cod_carta,
            imagem_carta: carta.imagem_carta,
            carta_valor: carta.carta_valor,
            carta_naipe: carta.carta_naipe,
            vira: carta.vira,
            par_id: carta.par_id
        }
        return retorno;
    }


    async inserirCartasMao(mao_id, cartas, participantes_ids, vira,banco){
        let par = {
            vira:vira,
            mao_id: mao_id,
            cards: []
        }
        let cartaRepo = new CartaRepositories(banco);
                let carta_vira = new CartaEntity();
                carta_vira.cod_carta = vira.cod_carta;
                carta_vira.imagem_carta = vira.imagem_carta;
                carta_vira.carta_valor = vira.carta_valor;
                carta_vira.carta_naipe = vira.carta_naipe;
                carta_vira.vira = 1;
                carta_vira.par_id = participantes_ids[0];
                carta_vira.mao_id = mao_id;
                let carta_inserida = await cartaRepo.inserirCartasMao(carta_vira);
                carta_vira.id = carta_inserida;
                par.vira = this.preencher(carta_vira);


            for(let j = 0; j < 3; j++){
                let carta = new CartaEntity();
                carta.cod_carta = cartas.deck_jogador1[j].cod_carta;
                carta.imagem_carta = cartas.deck_jogador1[j].imagem_carta;
                carta.carta_valor = cartas.deck_jogador1[j].carta_valor;
                carta.carta_naipe = cartas.deck_jogador1[j].carta_naipe;
                carta.vira = 0;
                carta.par_id = participantes_ids[0];
                carta.mao_id = mao_id;
                let carta_inserida = await cartaRepo.inserirCartasMao(carta);

                carta.id = carta_inserida;
                if(!carta_inserida){
                    return false;
                }
                par.cards.push(this.preencher(carta));
                carta.cod_carta = cartas.deck_jogador2[j].cod_carta;
                carta.imagem_carta = cartas.deck_jogador2[j].imagem_carta;
                carta.carta_valor = cartas.deck_jogador2[j].carta_valor;
                carta.carta_naipe = cartas.deck_jogador2[j].carta_naipe;
                carta.vira = 0;
                carta.par_id = participantes_ids[1];
                carta.mao_id = mao_id;
                carta_inserida = await cartaRepo.inserirCartasMao(carta);
                carta.id = carta_inserida;
                if(!carta_inserida){
                    return false;
                }
                par.cards.push(this.preencher(carta));
                carta.cod_carta = cartas.deck_jogador3[j].cod_carta;
                carta.imagem_carta = cartas.deck_jogador3[j].imagem_carta;
                carta.carta_valor = cartas.deck_jogador3[j].carta_valor;
                carta.carta_naipe = cartas.deck_jogador3[j].carta_naipe;
                carta.vira = 0;
                carta.par_id = participantes_ids[2];
                carta.mao_id = mao_id;
                carta_inserida = await cartaRepo.inserirCartasMao(carta);
                carta.id = carta_inserida;
                if(!carta_inserida){
                    return false;
                }
                par.cards.push(this.preencher(carta));
                carta.cod_carta = cartas.deck_jogador4[j].cod_carta;
                carta.imagem_carta = cartas.deck_jogador4[j].imagem_carta;
                carta.carta_valor = cartas.deck_jogador4[j].carta_valor;
                carta.carta_naipe = cartas.deck_jogador4[j].carta_naipe;
                carta.vira = 0
                carta.par_id = participantes_ids[3];
                carta.mao_id = mao_id;
                carta_inserida = await cartaRepo.inserirCartasMao(carta);
                carta.id = carta_inserida;
                if(!carta_inserida){
                    return false;
                }
                par.cards.push(this.preencher(carta));
            }
        return par;
    }

    toMap(rows) {
        if(rows && typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let carta = new CartaEntity();
                carta.id = row.id ? row.id : row.car_id;
                carta.cod_carta = row.code ? row.code : row.car_codigo;
                carta.imagem_carta = row.image ? row.image : row.car_imagem; 
                carta.carta_valor = row.value ? row.value : row.car_valor;
                carta.carta_naipe = row.suit ? row.suit : row.car_naipe;
                carta.vira = rows[0].code ? rows[0].code : rows[0].car_vira;
                carta.par_id = row.par_id ? row.par_id : row.par_id;

                lista.push(carta);
            }

            return lista;
        }
        else if (rows){
            let carta = new CartaEntity();

            carta.id = rows.id ? rows.id : rows.car_id;
            carta.cod_carta = rows.code? rows.code : rows.car_codigo;
            carta.imagem_carta = rows.image ? rows.image : rows.car_imagem;
            carta.carta_valor = rows.value  ? rows.value : rows.car_valor;
            carta.carta_naipe = rows.suit ? rows.suit : rows.car_naipe;
            carta.vira = rows.code ? rows.code : rows.car_vira;
            carta.par_id = rows.par_id ? rows.par_id : rows.par_id;

            return carta;
        }
        else {
            return null;
        }
    }
}
