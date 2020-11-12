const funcionarios = require('../database/funcionarios.json');
const path = require('path');
const fs = require('fs');

const FuncionarioController = {
    // pesquisa e retonar um funcionario de acordo com o tipo de requisição
    exibirFuncionarios: (req, res) => {

        // pesquisa por nome
        if(req.query.nome){
            let {nome} = req.query;
            let resultadoBusca = funcionarios.find(funcionario => {
                return funcionario.nome == nome;
            });

            // validando resultado da busca
            if(!resultadoBusca){
                res.send('Funcionario não encontrado!');
            }else{
                res.send(resultadoBusca);
            }
        }

        // pesquisa por cpf
        if(req.query.cpf){
            let {cpf} = req.query;
            let resultadoBusca = null;

            console.log(typeof(cpf));
            // validando cpf
            if(!cpf || cpf.length != 11){
                res.send('CPF inválido...')
            } else {
                resultadoBusca = funcionarios.find(funcionario => {
                    return funcionario.cpf == cpf;
                });
            }
            
            if(!resultadoBusca){
                res.send('Funcionario não encontrado!');
            }else{
                res.send(resultadoBusca);
            }
        }

        // pesquisa por cargo
        if(req.query.cargo){
            let {cargo} = req.query;
            let resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.cargo == cargo;
            });

            if(resultadoBusca.length == 0){
                res.send('Funcionario não encontrado!');
            }else{
                res.send(resultadoBusca);
            }
        }

        // pesquisa por data de cadastro
        if(req.query.dataCad){
            let {dataCad} = req.query;
            let resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.dataCad == dataCad;
            });

            if(!resultadoBusca){
                res.send('Funcionario não encontrado!');
            }else{
                res.send(resultadoBusca);
            }
        }

        // pesquisa por UF nascimento
        if(req.query.ufNasc){
            let {ufNasc} = req.query;
            let totalFuncionariosPorUf= 0;

            let resultadoBusca = funcionarios.filter(funcionario => {
                if(funcionario.ufNasc == ufNasc){
                    totalFuncionariosPorUf++
                    return funcionario;
                }
            })

            if(resultadoBusca.length == 0){
                res.send('Nenhuem funcionario foi encontrado')
            }else{
                res.send(resultadoBusca);   
            }            
        }

        // pesquisa por salario
        if(req.query.salario){
            let {salario} = req.query;
            let resultadoBusca = funcionarios.filter(funcionario => {
                return Number(funcionario.salario) <= Number(salario);
            });

            if(resultadoBusca.length == 0){
                res.send('Nenhum funcionário foi encontrado');
            }else{
                res.send(resultadoBusca);
            } 
        }

        // pesquisa por status
        if(req.query.status){
            let {status} = req.query;
            let resultadoBusca = funcionarios.filter(funcionario => {
                return funcionario.status == status;
            });

            if(!resultadoBusca){
                res.send('Funcionario não encontrado!');
            }else{
                res.send(resultadoBusca);
            }  
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
        let pesquisaFuncionario = funcionarios.find(func => {
            ++indice
            return func.cpf == cpf; 
            
        })

        // atualiza ou cadastra um funcionario
        if(pesquisaFuncionario){
            funcionarios[indice - 1] = funcionario;
        }else{
            funcionarios.push(funcionario);
        }

        // adiciona as informações na base de dados
        fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(funcionarios));

        res.send('Ação realizada com sucesso')
    },
    exibirFormulario: (req, res) => {
        res.render('deletarFuncionario')
    },
    excluirFormulario: (req, res) => {
        let {cpf} = req.body;
        let novaListaFuncionarios = null;

        // validando a entrada do cpf
        if(cpf.length != 11){
            res.send('CPF inválido! Verique se o numero informado está correto.')
        }else{
            novaListaFuncionarios = funcionarios.filter(funcionario => {
                return funcionario.cpf != cpf;
            })
        }
        
        // validando a variavel novaListaFuncionarios
        if(novaListaFuncionarios.length == funcionarios.length){
            res.send('Não foi possível realizar esta ação. CPF inválido ou inexistente.')
        }else{
            // adiciona as informações na base de dados sem o funcionario enviado via formulario
            fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(novaListaFuncionarios));
        } 

        res.send('Ação realizada com sucesso! Funcionario excluido.')
    }
}

module.exports = FuncionarioController;