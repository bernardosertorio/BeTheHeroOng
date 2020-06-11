const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate') 
const routes = require('./routes')

const app = express()

app.use(cors()) // função de segurança para acesso ao backend
app.use(express.json()) // Trazendo a função json para meu app. Json é responsável pela criação da linguagem dos meus objetos
app.use(routes)        // do banco de dados e requisição do corpo onde os mesmos serão entendidos como um objeto javascript.
app.use(errors())

module.exports = app; 

                        
// Rotas e recursos

// =========  Métodos HTTP ============

// - GET: Buscar-listar uma informação do back-end
// - POST: Criar uma informação no back-end
// - PUT: Alterar uma informação no back-end
// - DELETE: Deletar uma informação no back-end



// ========== Tipos de parâmetros ========

// - Query Params: Parâmetros nomeados e enviados na rota após "?" (Filtros com informações, paginação)
// - Route Params: Parâmetros utilizados para identificar recursos. Resposável pela requisição de apenas um id. 
// - Request Body: Corpo da requisição, utilizado para criar ou alterar recursos. 


// ========= Tipos de bancos de dados =========

// - SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server (Esses são tipos de bancos de dados relacionais. Tipo mais usado no mercado.)
// - NoSQL: MongoDB, CouchDB, etc... (Banco de dados não relacionais)
// - SQL: Representa a linguagem padrão dentro dos bancos de dados. Facilita a padronização e a utilização dos bancos de dados relacionais.



// ========= Formas de configurar nosso banco de dados ============

// - Podemos instalar pelo drive do próprio banco de dados
// - Ou utilizando a estratégia Query Builder (a ferramenta usada será o knex.js) que utiliza comandos do javascript que 
//   nos facilida utilizar nosso banco dedos em qualquer estrtura de banco de dados relacional


