import CartaRepositories from '../repositories/cartaRepositories.js';

export default class CartaController {

    async iniciarPartidaCartas(req, res) {
        try {
            let repo = new CartaRepositories();
            let deck = await repo.obter13Cartas();
            deck = await repo.rearanjarCartas(deck);
            res.status(200).json(deck);
        }
        catch(ex) {
            console.log(ex) 
            res.status(500).json({msg: ex.message});
        }
    }
}