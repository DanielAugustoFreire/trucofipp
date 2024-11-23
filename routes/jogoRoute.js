import express from 'express';
import jogoController from '../controllers/jogoController.js';

const router = express.Router();
const ctrl = new jogoController();

router.get('/:idSala', (req, res) => {


    ctrl.IniciarJogo(req, res);
});

export default router;