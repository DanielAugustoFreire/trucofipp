import express from 'express';
import jogoController from '../controllers/jogoController.js';

const router = express.Router();
const ctrl = new jogoController();

router.get('/:idSala', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Iniciar o Jogo'
    // #swagger.description = 'Essa Rota inicia o jogo'

    ctrl.IniciarJogo(req, res);
});

router.get('/existe/:idSala', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Verifica se o jogo ja existe'

    ctrl.VerificarSeOJogoExiste(req, res);
});

router.get('/idsParticipantes/:idJogo', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'busca os ids dos participantes'

    ctrl.buscarIdsParticipantesDeterminadoJogo(req, res);
});


export default router;