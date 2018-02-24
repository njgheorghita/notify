const express = require('express');
const router = express.Router();

const makersController = require('../controllers/makers');
router.post('/', makersController.create);
router.get('/', makersController.index);

module.exports = router;
