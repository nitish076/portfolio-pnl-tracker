const pnlService = require('../services/pnlService');

exports.getPnl = (req, res, next) => {
    try {
        const pnl = pnlService.getPnl();

        return res.status(200).json({
            success: true,
            data: pnl
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePrices = (req, res, next) => {
    try {
        const { prices } = req.body;

        if (!prices || typeof prices !== 'object') {
            return res.status(400).json({
                error: true,
                message: 'Invalid prices object'
            });
        }

        for (const [symbol, price] of Object.entries(prices)) {
            pnlService.updateLatestPrice(symbol, Number(price));
        }

        return res.status(200).json({
            success: true,
            data: pnlService.getLatestPrices()
        });
    } catch (error) {
        next(error);
    }
};
