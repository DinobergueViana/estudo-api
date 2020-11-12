const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.exibirFuncionarios);
router.get('/cadastrar', FuncionariosController.cadastrarFuncionario);
router.post('/cadastrar', FuncionariosController.salvarFuncionario);

module.exports = router;