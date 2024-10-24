import CartaEntity from "../entities/cartaEntity.js";


export default class CartaRepositories {


    async obter13Cartas() {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=3S,3D,3H,3C,2S,2D,2H,2C,AS,AD,AH,AC,KS,KD,KH,KC,JS,JD,JH,JC,QS,QD,QH,QC,7S,7D,7H,7C,6S,6D,6H,6C,5S,5D,5H,5C,4S,4D,4H,4C');
            const data = await response.json();
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=13`);
            const drawData = await drawResponse.json();
            return drawData.cards;
        } catch (ex) {
            throw ex;
        }
    }

    async rearanjarCartas(deck) {
        let valueManilha = this.toMap(deck[0]);

        let obj_retorno = {
            manilha: valueManilha,
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

    toMap(rows) {
        if(rows && typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let carta = new CartaEntity();
                carta.cod_carta = row.code;
                carta.imagem_carta = row.image;
                carta.carta_valor = row.value;
                carta.carta_naipe = row.suit;

                lista.push(carta);
            }

            return lista;
        }
        else if (rows){
            let carta = new CartaEntity();

            carta.cod_carta = rows.code;
            carta.imagem_carta = rows.image;
            carta.carta_valor = rows.value;
            carta.carta_naipe = rows.suit;

            return carta;
        }
        else {
            return null;
        }
    }

}