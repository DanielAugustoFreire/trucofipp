import express from 'express';
import EquipeController from '../controllers/equipeController.js';

const router = express.Router();
const ctrl = new EquipeController();

router.get('/:idSala', (req, res) => {
    // #swagger.tags = ['Equipe']
    // #swagger.summary = 'Nomes das equipes'
    // #swagger.description = 'Entrega o valor dos nomes das equipes baseado no id da sala'
    ctrl.ListarEquipes(req, res);
});

router.get('/Exclusivamente/:idSala', (req, res) => {
    // #swagger.tags = ['Equipe']
    // #swagger.summary = 'Nomes das equipes'
    // #swagger.description = 'Entrega o valor dos nomes das equipes baseado no id da sala'
    ctrl.ListarEquipesExclusivamente(req, res);
});

export default router;