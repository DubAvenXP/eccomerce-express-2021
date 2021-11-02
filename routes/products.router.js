const express = require('express');
const router = express.Router();

const ProductsService = require('../services/product.service');
const { validationHandler } = require('../middlewares/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema');

const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    return res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await service.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.update(id, req.body);
      return res.json(product);
    }
    catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.delete(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
