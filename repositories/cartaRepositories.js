import BaseRepositories from "./baseRepositories.js";


export default class CartaRepositories extends BaseRepositories {

    constructor(db) {
        super(db)
    }
    
    async obterCartaPorIdJogo(jogo_id) {
        let sql =`WITH MaoSelecionada AS (
                    SELECT mao_id
                    FROM tb_mao
                    WHERE jog_id = ?
                    ORDER BY mao_id DESC
                    LIMIT 1
                )
                SELECT *
                FROM tb_carta
                WHERE mao_id = (SELECT mao_id FROM MaoSelecionada);
                `
        let values = [jogo_id];

        let result = await this.db.ExecutaComando(sql, values);

        return result;
    }

    async inserirCartasMao(carta){
        let sql = 'insert into tb_carta (car_codigo, car_imagem, car_valor, car_naipe, car_vira, par_id, mao_id) values (?, ?, ?, ?, ?, ?, ?)';

        let values = [carta.cod_carta, carta.imagem_carta, carta.carta_valor, carta.carta_naipe, carta.vira, carta.par_id, carta.mao_id];

        let result = await this.db.ExecutaComandoLastInserted(sql, values);

        return result;
    }

    async obter13Cartas() {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=3S,3D,3H,3C,2S,2D,2H,2C,AS,AD,AH,AC,KS,KD,KH,KC,JS,JD,JH,JC,QS,QD,QH,QC,7S,7D,7H,7C,6S,6D,6H,6C,5S,5D,5H,5C,4S,4D,4H,4C');
            const data = await response.json();
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=13`);
            const drawData = await drawResponse.json();
            let retorno = {
                cards : drawData.cards,
                codigo : data.deck_id
            }
            return retorno;
        } catch (ex) {
            throw ex;
        }
    }



}