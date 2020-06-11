const generateUniqueId = require('../utils/generateUniqueId'); // Criação de um id com o crypto
const connection = require('../database/connection') //conectando arquivos com o banco de dados.

module.exports = {
  async index(req, res) { // listagem de ongs dentro do banco de dados.
    const ongs = await connection('ongs').select('*');
  
    return res.json(ongs);
  },


  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body; // desestruturação

    const id = generateUniqueId(); // gerador de id

    await connection('ongs').insert({ // conectando e inserindo dados dentro das tabelas no banco de dados.
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return res.json({ id });
  }
};