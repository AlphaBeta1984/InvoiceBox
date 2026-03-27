const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/invoiceController');

const router = Router();

const invoiceRules = [
  body('clientId').notEmpty().withMessage('clientId is required'),
  body('invoiceNumber').notEmpty().withMessage('invoiceNumber is required'),
  body('issueDate').isISO8601().withMessage('issueDate must be a valid date'),
  body('dueDate').isISO8601().withMessage('dueDate must be a valid date'),
  body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
  body('items.*.description').notEmpty().withMessage('each item must have a description'),
  body('items.*.quantity').isFloat({ gt: 0 }).withMessage('each item quantity must be > 0'),
  body('items.*.unitPrice').isFloat({ min: 0 }).withMessage('each item unitPrice must be >= 0'),
];

router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', invoiceRules, validate, ctrl.create);
router.put('/:id', invoiceRules, validate, ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;
