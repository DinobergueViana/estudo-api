const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.exibirOpcoes);
router.get('/listar', FuncionariosController.listarFuncionarios);
router.get('/criar', FuncionariosController.criarFuncionario);
router.post('/criar', FuncionariosController.salvarFuncionario);
router.get('/excluir', FuncionariosController.exibirExcluirFuncionario);
router.delete('/excluir/:cpf', FuncionariosController.excluirFuncionario);

module.exports = router;