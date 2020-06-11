const connection = require('../database/connection');

module.exports = { // listagem de incidente por ong
  async index(req, res) {
    const ong_id = req.headers.authorization; // acessar os dados de uma ong logada.

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

      return res.json(incidents);
  }
}