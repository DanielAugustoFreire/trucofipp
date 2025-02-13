import express from "express";
import cartaController from "../controllers/cartaController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const auth = new AuthMiddleware();
const ctrl = new cartaController();
const router = express.Router();

router.post(`/:jogo_id`, (req, res) => {
    // #swagger.tags = ['Cartas']
    // #swagger.summary = 'Pegar 12 cartas + Vira'
    // #swagger.description = 'Essa rota pega 12 cartas do baralho + a VIRA'
    
    ctrl.PegarCartasRodadaMao(req,res);
});

router.get(`/:jogo_id`, (req, res) => {
    // #swagger.tags = ['Cartas']
    // #swagger.summary = 'Pegar 12 cartas + Vira'
    // #swagger.description = 'Essa rota pega 12 cartas do baralho + a VIRA'
    
    ctrl.PegarCartasJogo(req,res);
});


export default router;