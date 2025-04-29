import express from 'express';
import FornecedorController from '../controllers/fornecedorController.js';
//import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new FornecedorController();
//let auth = new AuthMiddleware();

router.get("/listar", (req, res) => {
    // #swagger.tags = ['Fornecedor']
    // #swagger.summary = 'Endpoint para retornar todos os fornecedores'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

router.post("/gravar", (req, res) => {
    //#swagger.tags = ['Fornecedor']
    //#swagger.summary = 'Cadastra um fornecedor'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.gravar(req, res);
});

router.get("/obter/:id", (req, res) => {
    //#swagger.tags = ['Fornecedor']
    //#swagger.summary = 'Retorna um fornecedor baseado em um código'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.obter(req, res);
});

router.put("/alterar", (req, res) => {
    //#swagger.tags = ['Fornecedor']
    //#swagger.summary = 'Altera um fornecedor'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.alterar(req, res);
});

router.patch("/parcial", (req, res) => {
    //#swagger.tags = ['Fornecedor']
    //#swagger.summary = 'Realiza a alteração parcial do fornecedor'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.alterarParcialmente(req, res);
});

router.delete("/deletar/:id", (req, res) => {
    //#swagger.tags = ['Fornecedor']
    //#swagger.summary = 'Deleta um fornecedor'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.deletar(req, res);
});

export default router;
