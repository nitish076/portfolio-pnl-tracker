const portfolioService = require('../services/portfolioService');

exports.getPortfolio = (req, res, next) => {
    try {
        const portfolio = portfolioService.getPortfolio();

        return res.status(200).json({
            success: true,
            data: portfolio
        });
    } catch (error) {
        next(error);
    }
};
