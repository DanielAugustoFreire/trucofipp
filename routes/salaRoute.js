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
router.post(`/`, (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Criar sala
    // #swagger.description = 'Essa rota cria uma sala'
    // #swagger.responses[201] = {
    //     description: 'Sala criada',
    //     schema: {
    //         type: "object",
    //         properties: {
    //             mensagem: { type: "string" }
    //         }
    //     }
    // }
    // #swagger.responses[400] = {
    //     description: 'Sala já existe',
    //     schema: {
    //         type: "object",
    //         properties: {
    //             mensagem: { type: "string" }
    //         }
    //     }
    // }
    // #swagger.responses[500] = {
    //     description: 'Erro ao criar sala',
    //     schema: {
    //         type: "object",
    //         properties: {
    //             mensagem: { type: "string" },
    //             erro: { type: "object" }
    //         }
    //     }
    // }
    
    ctrl.criarSala(req,res);
});

export default router;