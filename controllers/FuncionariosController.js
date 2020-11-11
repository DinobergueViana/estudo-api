const data = require('../database/data.json');

const FuncionarioController = {
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
    }
}

module.exports = FuncionarioController;