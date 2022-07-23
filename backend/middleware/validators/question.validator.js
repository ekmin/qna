const {check, validationResult} = require('express-validator');

exports.validateQuestion = [
    check('que_name', 'Heading is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

exports.validateComment = [
    check('text', 'Text is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
