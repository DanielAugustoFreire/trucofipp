import express from 'express';
import AutenticacaoController from '../controllers/authController.js';

const router = express.Router();
let ctrl = new AutenticacaoController()

router.post("/token", (req,res) => {
// #swagger.tags = ['Autenticacao']
// #swagger.summary = 'Faz Login'
/*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    senha: { type: "string" }
                },
                required: ["email", "senha"]
            },
            example: {
                email: "danielaugustosant@hotmail.com",
                senha: "12345"
            }
        }
    }
} */

    ctrl.token(req,res);
})

router.post("/cadastrar", (req,res) => {
// #swagger.tags = ['Autenticacao']
// #swagger.summary = 'Cadastra um novo usuario'
    /*  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        nome: { type: "string" },
                        email: { type: "string" },
                        senha: { type: "string" },
                    },
                    required: ["nome","email", "senha"]
                },
                example: {
                    nome: "Daniel Augusto",
                    email: "danielaugustosant@hotmail.com",
                    senha: "12345"
                }
            }
        }
    } */

    ctrl.cadastrar(req,res);
})

router.post("/api/validarFront", (req,res) => {
    ctrl.validarFrontEnd(req,res)
})

export default router;