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
        
    }
}
module.exports = FuncionarioController;