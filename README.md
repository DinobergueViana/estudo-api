## Setup 

Para que o projeto funcione de maneira adequada, é necessário ter o NodeJS instalado na sua máquina. Após a instalação (se for o seu caso), basta seguir os seguintes passos para rodar a aplicação:

1. clonar o repositório;
2. abrir o terminal na pasta do projeto;
3. executar o comando `npm install`;
4. ainda com o terminal aberto, rode o comando `node app.js`;

Seguindo esses passos você será capaz de abrir a aplicação e realizar os testes.  

## API 

Para acessar a API utilize o endpoint `/api/funcionarios`. Segue abaixo o endpoint para cada ação solicitada:

```
GET    '/api/funcionarios/'     # Pesquisar Funcionarios
POST   '/api/funcionarios/'     # Salvar Funcionario
DELETE '/api/funcionarios/:cpf' # Excluir Funcionario
```


## Frontend

Para acessar a aplicação acesse a rota `/funcionarios`.
