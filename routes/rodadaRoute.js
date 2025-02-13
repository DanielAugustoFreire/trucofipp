import express from 'express';
import RodadaController from '../controllers/rodadaController.js';

const router = express.Router();
const ctrl = new RodadaController();

router.get('/:mao_id', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Iniciar o rodada'
    // #swagger.description = 'Essa Rota inicia uma rodada'

    ctrl.IniciarRodada(req, res);
});

export default router;