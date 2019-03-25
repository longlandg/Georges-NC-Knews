

const endpoint = require('../endpoint.json');

exports.getapi = (req, res, next) => {
  res.status(200).send({ endpoint });
 
};
