const HttpError = require('standard-http-error');
const {
  thinky: {
    Errors: { DocumentNotFound, ValidationError }
  }
} = require('../../config');

module.exports = (err, req, res, next) => {
  if (err instanceof DocumentNotFound) {
    res.status(404).send({ error: 'not found' });
  } else if (err instanceof ValidationError) {
    res.status(422).send({ error: err.message });
  } else if (err instanceof HttpError) {
    res.status(err.code).json({ error: err.message });
  }

  next(err);
};
