

exports.handle405 = ((req, res) => res.status(405).send({ msg: 'patch / put / delete method not allowed' }));


exports.handle400 = ((err, req, res, next) => {
  if (err.code === '23502') res.status(400).send({ msg: 'BAD REQUEST information required' });
  else if (err.code === '23505') res.status(422).send({ msg: 'BAD REQUEST duplicate key value violates unique constraint "topics_pkey"' });
  else if (err.code === '42703') res.status(400).send({ msg: 'BAD REQUEST column does not exist' });
  else next(err);
});
