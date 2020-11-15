const express = require('express');
const funcionariosRouter = require('./routes/funcionariosRouter');
const apiRouter = require('./routes/apiRouter');
const path = require('path')
const methodOverride = require('method-override');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// essa configuração permite trabalhar com dados enviados a partir da URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// essa configuração permite usar o metodos PUT e DELETE que não estão presentes em todos os navegadores
app.use(methodOverride('_method'));

app.use('/api/funcionarios', apiRouter);
app.use('/funcionarios', funcionariosRouter);

// levantando servidor
app.listen(3000, () => {
    console.log('Servidor rodando');
})