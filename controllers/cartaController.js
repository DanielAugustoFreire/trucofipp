import CartaRepositories from '../repositories/cartaRepositories.js';

export default class CartaController {

    async pegarCartas(req, res) {
        try {
            let repo = new CartaRepositories();
            let deck = await repo.obterDeck();
            let carta = await repo.obterDeck();
            res.status(200).json(result);
        }
        catch(ex) {
            console.log(ex)
            res.status(500).json({msg: ex.message});
        }
    }
}