const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.exibirOpcoes);
router.get('/pesquisar', FuncionariosController.pesquisarFuncionarios);
router.get('/cadastrar', FuncionariosController.cadastrarFuncionario);
router.post('/cadastrar', FuncionariosController.salvarFuncionario);
router.get('/excluir', FuncionariosController.exibirFormExcluirFuncionario);
router.delete('/excluir/:cpf', FuncionariosController.excluirFormulario);

module.exports = router;