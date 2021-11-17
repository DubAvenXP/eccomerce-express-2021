const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const { validationHandler } = require('../middlewares/validator.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../schemas/user.schema');

const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.update(id, req.body);
      return res.json(user);
    }
    catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
