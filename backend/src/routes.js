const express = require('express');// puxando o express
const { celebrate, Segments, Joi} = require('celebrate'); // puxando elementos do celebrate para validação dos dados recebidos

const OngController = require('./controllers/OngController'); //trazendo o método de cadastro de uma ong para rotas.
const IncidentController = require('./controllers/IncidentController'); //trazendo o método de cadastro de incidentes de uma ong para rotas.
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router() // baixando a função rotas do express


routes.post('/sessions', SessionController.create); // rota de login de uma ong


routes.get('/ongs', OngController.index); //listagem de ongs


routes.post('/ongs', celebrate({ // // criação de ongs e validação dos dados de criação da ong com o celebrate. Validação do Body de uma requisição.
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create); 


routes.get('/profile', celebrate({ //Listagem de incidentes por ong. Tivemos que fazer outro arquivo só para essa listagem 
                                  // já que por padrão é recomendavel fazer só 5 funções controllers por arquivo. Validação do id no Header.
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  }), ProfileController.index); 


routes.post('/incidents', IncidentController.create); // criação de incidentes


routes.get('/incidents', celebrate({  // listagem de incidentes e validação da página.
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);


routes.delete('/incidents/:id', celebrate({ // deletar um incidente e validação do id do incidente.
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete); 

module.exports = routes;