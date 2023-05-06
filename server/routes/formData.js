const express = require('express');
const router = express.Router();

const { getFormData, updateFormData } = require('../controllers/formData');

router.get('/', getFormData);
router.patch('/', updateFormData);

module.exports = router;