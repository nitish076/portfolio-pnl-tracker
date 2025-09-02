const tradeService = require('../services/tradeService');

exports.addTrade = (req, res, next) => {
    try {
        const { symbol, side, price, quantity, timestamp } = req.body;

        if (!symbol || !side || !price || !quantity) {
            return res.status(400).json({
                error: true,
                message: 'Missing required fields (symbol, side, price, quantity)'
            });
        }

        const trade = tradeService.addTrade(
            symbol,
            side,
            Number(price),
            Number(quantity),
            timestamp || Date.now()
        );

        return res.status(201).json({
            success: true,
            data: trade
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTrades = (req, res, next) => {
    try {
        const trades = tradeService.getAllTrades();

        return res.status(200).json({
            success: true,
            data: trades
        });
    } catch (error) {
        next(error);
    }
};
