const express = require('express');
const ApiController = require('../controllers/ApiController');
const router = express.Router();

router.get('/', ApiController.pesquisarFuncionarios);
router.post('/', ApiController.salvarFuncionario);
router.delete('/:cpf', ApiController.excluirFuncionario);



module.exports = router
