import express from 'express'
import ConteudoController from '../controllers/conteudoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new ConteudoController();
let auth = new AuthMiddleware();

router.get("/", auth.validar ,(req,res) => {
    // #swagger.tags = ['Conteudo']
    // #swagger.summary = "Endpoint para listar os conteudos disponiveis"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.listar(req,res);
});

router.get("/:id", auth.validar ,(req,res) => {
    // #swagger.tags = ['Conteudo']
    // #swagger.summary = "Endpoint para obter um conteudo disponivel"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.obter(req,res);
});

router.delete("/:id", auth.validar ,(req,res) => {
    // #swagger.tags = ['Conteudo']
    // #swagger.summary = "Endpoint para excluir um conteudo disponivel"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.excluir(req,res);
});

router.post("/", auth.validar ,(req,res) => {
// #swagger.tags = ['Conteudo']
// #swagger.summary = "Endpoint para cadastrar novos conteudos"
/* #swagger.security = [{
    "bearerAuth": []
}]*/
/*  #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                allOf: [
                    { $ref: "#/components/schemas/conteudoModel" },
                    { 
                      type: "object",
                      properties: {
                        id: {
                          type: "number",
                          readOnly: true
                        }
                      }
                    }
                ]
            }
        }
    }
} 
*/

    ctrl.gravar(req,res);
});

router.put("/", auth.validar ,(req,res) => {
    // #swagger.tags = ['Conteudo']
    // #swagger.summary = "Endpoint para atualizar totalment um conteudo"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
       /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudoModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req,res);
});

router.get("/assistir/:id", auth.validar, (req,res) => {
    // #swagger.tags = ['Conteudo - Assistir']
    // #swagger.summary = "Endpoint para receber o html do video"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.assistir(req,res);
})

router.get("/capa/:id", auth.validar, (req,res) => {
    // #swagger.tags = ['Conteudo - Capa']
    // #swagger.summary = "Endpoint para receber o html da capa"
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
    ctrl.verCapa(req,res);
})



export default router;