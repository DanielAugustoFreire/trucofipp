import Database from '../db/database.js';
import CartaEntity from '../entities/cartaEntity.js';
import maoEntity from '../entities/maoEntity.js';

export default class CartaController {

    async PegarCartasRodadaMao(req, res) {
        let banco = Database.getInstance();
        await banco.AbreTransacao();
        try {
            let { jogo_id } = req.  params;
            let participantes_ids = req.body.participantes_ids;
            let ordem = req.body.ordem;
            let cartas = new CartaEntity();
            let lista_cartas = await cartas.obter13Cartas();
            let mao = new maoEntity("", ordem, lista_cartas.codigo, "", "", jogo_id, "");
            
            let mao_criacao = await mao.InserirMao(banco);
            if(!mao_criacao) {
                await banco.Rollback();
                res.status(500).json({msg: "Erro ao criar mão"}); 
                return;
            }

            let retorno = {
                cod_carta: lista_cartas.codigo,
                cards: lista_cartas.cards    
            }
            retorno.cards = cartas.rearanjarCartas(lista_cartas.cards);

            let cartas_inseridas = await cartas.inserirCartasMao(mao_criacao, retorno.cards, participantes_ids, retorno.cards.vira, banco);
            if(!cartas_inseridas) {
                await banco.Rollback();
                res.status(500).json({msg: "Erro ao inserir cartas na mão"}); 
                return;
            }

            
            await banco.Commit();
            res.status(200).json(cartas_inseridas);
        }
        catch(ex) {
            await banco.Rollback();
            res.status(500).json({msg: ex.message});
        }
    }
}