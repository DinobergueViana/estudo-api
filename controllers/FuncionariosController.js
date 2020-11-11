const { query } = require('express');
const data = require('../database/data.json');

const FuncionarioController = {
    exibirFuncionarios: (req, res) => {
        if(req.query.nome){
            let {nome} = req.query;
            res.send(nome);
        }
        if(req.query.cpf){
            let {cpf} = req.query;
            res.send(cpf)
        }
        if(req.query.cargo){
            res.send('cargo')
        }
        if(req.query.dataCad){
            res.send('dataCad')
        }
        if(req.query.ufNasc){
            res.send('uf')
        }
        if(req.query.salario){
            res.send('salario')
        }
        if(req.query.status){
            res.send('status')
        }
    },
    incluirFuncionario: (req, res) => {
        res.send('Incuir Funcionario')
    },
    excluirFuncionario: (req, res) => {
        res.send('Excluir Incluir')
    }
}

module.exports = FuncionarioController;