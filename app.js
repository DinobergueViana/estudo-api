const express = require('express');
const funcionarioRouter = require('./routes/funcionarioRouter');

const app = express();

app.use('/funcionario', funcionarioRouter);

app.listen(3000, () => {
    console.log('Servidor rodando');
})