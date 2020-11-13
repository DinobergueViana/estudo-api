const express = require('express');
const funcionariosRouter = require('./routes/funcionariosRouter');
const indexRouter = require('./routes/indexRouter');
const path = require('path')
const methodOverride = require('method-override');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/funcionarios', funcionariosRouter);

app.listen(3000, () => {
    console.log('Servidor rodando');
})