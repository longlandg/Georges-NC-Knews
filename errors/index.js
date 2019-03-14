

exports.handle405 = ((req, res) => res.status(405).send({ msg: 'patch / put / delete method not allowed' }));
