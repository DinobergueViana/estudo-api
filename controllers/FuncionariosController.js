const funcionarios = require('../database/funcionarios.json');
const path = require('path');
const fs = require('fs');

const FuncionarioController = {
    index: (req, res) => {
        res.render('index');
    },
    mostrarOpcoes: (req, res) => {
        res.render('listarFuncionarios', {resultadoBusca:[], errors:[]});
    },

    // pesquisa e retonar um funcionario de acordo com o tipo de requisição
    pesquisarFuncionarios: (req, res) => {

        let resultadoBusca = [];

        // pesquisa por nome
        if(req.query.nome){
            let {nome} = req.query;
            resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.nome == nome;
            });

        }

        // pesquisa por cpf
        if(req.query.cpf){
            let {cpf} = req.query;
            
            // validando cpf
            if(cpf.length != 11){
                return res.render('listarFuncionarios', {resultadoBusca, errors: ['cpf inválido']})
            } else {
                resultadoBusca = funcionarios.filter(funcionario => {
                    return funcionario.cpf == cpf;
                });
            }
            
        }

        // pesquisa por cargo
        if(req.query.cargo){
            let {cargo} = req.query;
            resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.cargo == cargo;
            });
        }

        
        if(req.query.dataCad){
            let {dataCad} = req.query;
            // pesquisa por data de cadastro no formato dd/mm/yyyy
            dataCad = dataCad.split('-').reverse().join('/');
            resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.dataCad == dataCad;
            });
        }

        // pesquisa por UF nascimento
        if(req.query.ufNasc){
            let {ufNasc} = req.query;

            resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.ufNasc == ufNasc;
            })
           
        }

        // pesquisa por salario
        if(req.query.salario){
            let {salario} = req.query;
            resultadoBusca = funcionarios.filter(funcionario => {
                return Number(funcionario.salario) <= Number(salario);
            });

        }

        // pesquisa por status
        if(req.query.status){
            let {status} = req.query;
            resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.status == status;
            });
 
        }

        res.render('listarFuncionarios', {resultadoBusca, errors: []});
        
    },
    criarFuncionario: (req, res) => {
        res.render('criarFuncionario');
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
        let pesquisaFuncionario = funcionarios.find(func => {
            ++indice
            return func.cpf == cpf; 
            
        })

        // atualiza funcionario
        if(pesquisaFuncionario){
            funcionarios[indice - 1] = funcionario;

        // cadastra um funcionario
        }else{
            funcionarios.push(funcionario);
        }

        // adiciona as informações na base de dados
        fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(funcionarios));

        res.redirect('listar/pesquisar?cpf=' + funcionario.cpf);
    },
    exibirExcluirFuncionario: (req, res) => {
        res.render('excluirFuncionario', {errors:[]});
    },
    excluirFuncionario: (req, res) => {
        let {cpf} = req.body;
        let novaListaFuncionarios = null;

        // validando a entrada do cpf
        if(cpf.length != 11){
            return res.render('excluirFuncionario', {errors: ['CPF inválido! Verique se o numero informado está correto.']})

        }else{
            novaListaFuncionarios = funcionarios.filter(funcionario => {
                return funcionario.cpf != cpf;
            })
        }
        
        // validando a variavel novaListaFuncionarios
        if(novaListaFuncionarios.length == funcionarios.length){
            return res.render('excluirFuncionario', {errors: ['Funcionario não encontrado']})
        }else{
            // adiciona as informações na base de dados sem o funcionario enviado via formulario
            fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(novaListaFuncionarios));
        } 

        res.redirect('/funcionarios/listar');
    }
}

module.exports = FuncionarioController;