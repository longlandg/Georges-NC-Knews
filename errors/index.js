exports.handle405 = (req, res) => res.status(405).send({ msg: 'patch / put / delete method not allowed' });

exports.handle422 = (err, req, res, next) => {
  if (err.code === '23505') {
    res.status(422).send({
      msg:
        'BAD REQUEST duplicate key value violates unique constraint "topics_pkey"',
    });
  } else if (err.code === '23503') {
    res.status(422).send({ msg: 'UNPROCESSED ENTITY input not in table' });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === '2') {
    res.status(404).send({ msg: 'Route does not exist' });
  } else if (err.code === '5') {
    res.status(404).send({
      msg: 'PAGE NOT FOUND',
    });
  } else next(err);
};

exports.handle400 = (err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).send({ msg: 'BAD REQUEST information required' });
  } else if (err.code === '22P02') {
    res.status(400).send({ msg: 'BAD REQUEST invalid input' });
  } else if (err.code === '42703') {
    res.status(400).send({ msg: 'BAD REQUEST column does not exist' });
  } else if (err.code === '13') {
    res.status(400).send({ msg: 'BAD REQUEST column does not exist' });
  } else if (err.code === '1') {
    res.status(400).send({ msg: 'BAD REQUEST wrong input type' });
  } else next(err);
};
