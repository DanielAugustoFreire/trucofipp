import express from 'express';
import movimentacaoController from '../controllers/movimentacaoController.js';


const router = express.Router();
const ctrl = new movimentacaoController();

router.post('/', (req, res) => {
    // #swagger.tags = ['Movimento']
    // #swagger.summary = 'Registra um movimento'
    // #swagger.description = 'Essa Rota registra um movimento'

    ctrl.registrarMovimento(req, res);
});

export default router;