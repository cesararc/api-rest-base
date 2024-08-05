const express = require('express');
const passport = require('passport');

const  validatorHandler  = require('../middlewares/validator.handler');
const  { checkRoles } = require('../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schema/category.schema');
const  CategoryService  = require('../services/category.service');
const router = express.Router();


const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
}
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'customer'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
    validatorHandler(createCategorySchema, 'body'),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    checkRoles('admin'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.delete(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
