const express = require('express');
const FuncionariosController = require('../controllers/FuncionariosController')

const router = express.Router();

router.get('/', FuncionariosController.exibirFuncionarios);

module.exports = router;