const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Item.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.getAll(req.user.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
