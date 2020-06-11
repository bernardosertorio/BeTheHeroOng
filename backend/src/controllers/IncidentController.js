const connection = require('../database/connection');

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query; // lógica de paginação

    const [ count ] = await connection('incidents').count(); // contador de casos

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // relacionar dados de duas tabelas
      .limit(5)
      .offset((page - 1) * 5)
      .select([ // selecionando os dados que queremos das tabelas
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)'])
    
    return res.json(incidents);
  },


  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return res.json({ id });
  },


  async delete(req, res) { // função para deletar. 
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id) // comparação entre o id's de incidente.
      .select('ong_id') // seleciona só uma coluna para comparação
      .first(); // restorna apenas um resutado
      
    if (incident.ong_id != ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();

  }
};