const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const data = await Item.getById(req.params.id);
    if (!data || data.user_id !== req.user.id) {
      throw new Error('You are not authorized to view this page.');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
