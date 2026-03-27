const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const asyncHandler = require('../middleware/asyncHandler');
const ctrl = require('../controllers/clientController');

const router = Router();

const clientRules = [
  body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('email must be valid'),
];

router.get('/', asyncHandler(ctrl.list));
router.get('/:id', asyncHandler(ctrl.show));
router.post('/', clientRules, validate, asyncHandler(ctrl.create));
router.put('/:id', clientRules, validate, asyncHandler(ctrl.update));
router.delete('/:id', asyncHandler(ctrl.destroy));

module.exports = router;
