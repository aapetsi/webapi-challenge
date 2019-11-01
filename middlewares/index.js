const validateId = (req, res, next) => {
  const id = req.params.id;
  if (parseInt(id) > 0) {
    next();
  } else {
    res.status(400).json({ message: 'A valid id is required' });
  }
};

const validateBody = (req, res, next) => {
  const itemToSave = req.body;
  if (Object.keys(itemToSave).length === 0) {
    res.status(400).json({ message: 'Please provide the required inputs' });
  } else {
    next();
  }
};

module.exports = {
  validateId,
  validateBody
};
