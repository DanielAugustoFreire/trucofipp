import express from "express";
import ParticipanteController from "../controllers/participanteController.js";

//const auth = new AuthMiddleware();
const ctrl = new ParticipanteController();
const router = express.Router();

router.get(`/validarDisponibilidade/:user_id`, (req, res) => {
    // #swagger.tags = ['Participante']
    // #swagger.summary = 'Validar Se o Jogador esta disponivel'
    
    ctrl.ValiadrParticipanteDisponivel(req,res);
});

router.delete(`/sairSala/:user_id`, (req, res) => {
    // #swagger.tags = ['Participante']
    // #swagger.summary = 'Sair da Sala'
    
    ctrl.SairSala(req,res);
});

router.get(`/obterIdParticipante/:usu_id`, (req, res) => {
    // #swagger.tags = ['Participante']
    // #swagger.summary = 'Obter Participantes da Sala'
    
    ctrl.ObterIdPar(req,res);
});

export default router;