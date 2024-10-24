import express from "express";
import cartaController from "../controllers/cartaController.js";


const ctrl = new cartaController();
const router = express.Router();

router.get(`/`, (req, res) => {
    ctrl.pegarCartas(req,res);
});

export default router;