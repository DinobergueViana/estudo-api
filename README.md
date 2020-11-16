# Desafio Allugator

## Solução proposta

Tendo como base os conhecimentos que adquiri nesses meses como estudante, elaborei um sistema web que permite realizar os serviços listados no desafio proposto.

## Requisitos técnicos

- Front-end: HTML, CSS e JavaScript.

- Framework: BOOTSTRAP;

- Back-end: JavaScript, NodeJS, Express;

O motivo da preferência por JavaScript é que venho estudando e desenvolvendo atividades, pequenos projetos, nessa linguagem desde julho deste ano, durante o curso
que estou fazendo atualmente. 

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

Para acessar a aplicação acesse a rota `localhost:3000/funcionarios`.
