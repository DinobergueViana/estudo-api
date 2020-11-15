const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.index);
router.get('/listar', FuncionariosController.mostrarOpcoes);
router.get('/listar/pesquisar', FuncionariosController.pesquisarFuncionarios);
router.get('/criar', FuncionariosController.criarFuncionario);
router.post('/criar', FuncionariosController.salvarFuncionario);
router.get('/excluir', FuncionariosController.exibirExcluirFuncionario);
router.delete('/excluir/:cpf', FuncionariosController.excluirFuncionario);

module.exports = router;