const express = require('express');
const funcionarioRouter = require('./routes/funcionarioRouter');
const methodOverride = require('method-override');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/', funcionarioRouter);

app.listen(3000, () => {
    console.log('Servidor rodando');
})