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
router.get("/:id", (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'ListarSala
    // #swagger.description = 'Essa rota lista as salas'
    ctrl.listarPlayers(req,res);
})
router.post(`/`, (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Criar sala
    // #swagger.description = 'Essa rota cria uma sala'
    
    ctrl.criarSala(req,res);
});

export default router;