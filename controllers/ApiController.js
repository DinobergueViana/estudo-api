const funcionarios = require('../database/funcionarios.json');
const path = require('path');
const fs = require('fs');

const ApiController = {

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
                res.status(422).send({error: 'cpf inválido'})
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

        // pesquisa por data de cadastro no formato dd/mm/yyyy
        if(req.query.dataCad){
            let {dataCad} = req.query;

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

        if(resultadoBusca.length == 0){
            res.status(404).send({error: 'nenhum funcionário foi encontrado'})
        }else{
            res.send(resultadoBusca);
        }
        
    },
    salvarFuncionario: (req, res) => {
        // o parametro dataCad deve obedecer o formato dd/mm/yyyy
        let { dataCad, cargo, cpf, nome, ufNasc, salario, status } = req.body;

        if( !(dataCad && cargo && cpf && nome && ufNasc && salario && status) ){
            return res.status(422).send({error: 'paramentros inválidos'})
        }

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

        let statusReq = 200;

        // atualiza funcionario
        if(pesquisaFuncionario){
            funcionarios[indice - 1] = funcionario;
        // cadastra um funcionario
        }else{
            funcionarios.push(funcionario);
            statusReq = 201;
        }

        // adiciona as informações na base de dados
        fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(funcionarios));

        res.status(statusReq).send(funcionario);
    },
    excluirFuncionario: (req, res) => {
        let {cpf} = req.params;
        let novaListaFuncionarios = null;

        // validando a entrada do cpf
        if(cpf.length != 11){
            res.status(422).send({error: 'cpf inválido'});
        }

        novaListaFuncionarios = funcionarios.filter(funcionario => {
            return funcionario.cpf != cpf;
        })
        
        // validando a variavel novaListaFuncionarios
        if(novaListaFuncionarios.length == funcionarios.length){
            res.status(404).send({error: 'funcionário não encontrado'})
        }else{
            // adiciona as informações na base de dados sem o funcionario enviado via formulario
            fs.writeFileSync(path.join('database', 'funcionarios.json'), JSON.stringify(novaListaFuncionarios));
        } 

        res.send({});
    }
}

module.exports = ApiController;