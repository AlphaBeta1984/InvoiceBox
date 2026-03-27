const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/clientController');

const router = Router();

const clientRules = [
  body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('email must be valid'),
];

router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', clientRules, validate, ctrl.create);
router.put('/:id', clientRules, validate, ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;
