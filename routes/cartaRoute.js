import express from "express";
import cartaController from "../controllers/cartaController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const auth = new AuthMiddleware();
const ctrl = new cartaController();
const router = express.Router();

router.get(`/`, (req, res) => {
    // #swagger.tags = ['Cartas']
    // #swagger.summary = 'Pegar 12 cartas'
    // #swagger.description = 'Essa rota pega 12 cartas do baralho'
    // #swagger.responses[200] = {
    //     description: 'Cartas retornadas',
    //     schema: {
    //         type: "array",
    //         items: {
    //             $ref: "#/definitions/Carta"
    //         }
    //     }
    // }
    // #swagger.responses[500] = {
    //     description: 'Erro no servidor',
    //     schema: {
    //         $ref: "#/definitions/Erro"
    //     }
    // }
    
    ctrl.iniciarPartidaCartas(req,res);
});

export default router;