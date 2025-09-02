const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trade.controller');

router.post('/', tradeController.addTrade);
router.get('/', tradeController.getAllTrades);

module.exports = router;
