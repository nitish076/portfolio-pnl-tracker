const express = require('express');
const router = express.Router();
const pnlController = require('../controllers/pnl.controller');

router.get('/', pnlController.getPnl);
router.post('/prices', pnlController.updatePrices);

module.exports = router;
