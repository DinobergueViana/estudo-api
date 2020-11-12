const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.exibirFuncionarios);
router.get('/cadastrar', FuncionariosController.cadastrarFuncionario);
router.post('/cadastrar', FuncionariosController.salvarFuncionario);
router.get('/excluir', FuncionariosController.exibirFormulario);
router.delete('/excluir/:cpf', FuncionariosController.excluirFormulario);

module.exports = router;