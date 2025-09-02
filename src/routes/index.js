const express = require('express');
const router = express.Router();

const tradeRoutes = require('./trade.routes');
const portfolioRoutes = require('./portfolio.routes');
const pnlRoutes = require('./pnl.routes');

router.use('/trades', tradeRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/pnl', pnlRoutes);

module.exports = router;
