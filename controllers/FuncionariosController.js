const data = require('../database/data.json');
const path = require('path');
const fs = require('fs');

const FuncionarioController = {
    // pesquisa e retonar um funcionario de acordo com o tipo de requisição
    exibirFuncionarios: (req, res) => {

        if(req.query.nome){
            let {nome} = req.query;
            let resultadoBusca = data.find(funcionario => {
                return funcionario.nome == nome;
            });

            res.send(resultadoBusca);
        }

        if(req.query.cpf){
            let {cpf} = req.query;
            let resultadoBusca = data.find(funcionario => {
                return funcionario.cpf == cpf;
            });

            res.send(resultadoBusca);
        }

        if(req.query.cargo){
            let {cargo} = req.query;
            let resultadoBusca = data.filter(funcionario => {
                return funcionario.cargo == cargo;
            });

            res.send(resultadoBusca);
        }

        if(req.query.dataCad){
            let {dataCad} = req.query;
            let resultadoBusca = data.filter(funcionario => {
                return funcionario.dataCad == dataCad;
            });

            res.send(resultadoBusca);
        }

        if(req.query.ufNasc){
            let {ufNasc} = req.query;

            res.send('Uf de nascimento: ' + ufNasc);   
        }

        if(req.query.salario){
            let {salario} = req.query;
            let resultadoBusca = data.filter(funcionario => {
                return Number(funcionario.salario) <= Number(salario);
            });

            res.send(resultadoBusca);  
        }

        if(req.query.status){
            let {status} = req.query;
            let resultadoBusca = data.filter(funcionario => {
                return funcionario.status == status;
            });

            res.send(resultadoBusca);  
        }
    },
    cadastrarFuncionario: (req, res) => {
        res.render('form');
    },
    salvarFuncionario: (req, res) => {
        let { dataCad, cargo, cpf, nome, ufNasc, salario, status } = req.body;

        // converte a data recebida para formato dd/mm/yyyy
        dataCad = dataCad.split('-').reverse().join('/');

        let funcionario = {
            dataCad, 
            cargo, 
            cpf, 
            nome, 
            ufNasc, 
            salario, 
            status
        }

        // busca e retorna o indice de um funcionario caso o encontre
        let indice = 0;
        let pesquisaFuncionario = data.find(func => {
            ++indice
            return func.cpf == cpf; 
            
        })

        // atualiza/cadastra um funcionario
        if(pesquisaFuncionario){
            data[indice - 1] = funcionario;
        }else{
            data.push(funcionario);
        }

        // adiciona as informações na base de dados
        fs.writeFileSync(path.join('database', 'data.json'), JSON.stringify(data));

        res.send('Ação realizada com sucesso')
    }
}

module.exports = FuncionarioController;