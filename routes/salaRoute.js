import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import salaController from "../controllers/salaController.js";

const auth = new AuthMiddleware();
const router = express.Router();
const ctrl = new salaController()

router.get("/", (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'ListarSala
    // #swagger.description = 'Essa rota lista as salas'
    ctrl.listarSalas(req,res);
})
router.get("/:id_sala", (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Lista Players e equipes de determinada sala'
    // #swagger.description = 'Lista Players e equipes de determinada sala'
    ctrl.ListarPlayersSalas(req,res);
})
router.post(`/`, (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Criar sala
    // #swagger.description = 'Essa rota cria uma sala'
    
    ctrl.criarSala(req,res);
});
router.post('/inserirParticipante', (req,res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Inserir Participante'
    // #swagger.description = 'Essa rota insere um participante na sala'
    ctrl.inserirParticipante(req,res);
})

export default router;