const tradeService = require('../src/services/tradeService');
const portfolioService = require('../src/services/portfolioService');

describe('PortfolioService', () => {
    beforeEach(() => {
        tradeService.trades = [];
    });

    test('empty portfolio', () => {
        const portfolio = portfolioService.getPortfolio();
        expect(Object.keys(portfolio).length).toBe(0);
    });

    test('portfolio with single buy trade', () => {
        tradeService.addTrade('BTC', 'buy', 40000, 1);

        const portfolio = portfolioService.getPortfolio();

        expect(portfolio).toHaveProperty('BTC');
        expect(portfolio.BTC.totalQuantity).toBe(1);
        expect(portfolio.BTC.averageEntryPrice).toBe(40000);
    });

    test('portfolio with multiple buy trades', () => {
        tradeService.addTrade('BTC', 'buy', 40000, 1);
        tradeService.addTrade('BTC', 'buy', 42000, 1);

        const portfolio = portfolioService.getPortfolio();

        expect(portfolio.BTC.totalQuantity).toBe(2);
        expect(portfolio.BTC.averageEntryPrice).toBe(41000); // (40000 + 42000) / 2
    });

    test('portfolio after sell trades', () => {
        tradeService.addTrade('BTC', 'buy', 40000, 2);
        tradeService.addTrade('BTC', 'sell', 43000, 1);

        const portfolio = portfolioService.getPortfolio();

        expect(portfolio.BTC.totalQuantity).toBe(1);
        expect(portfolio.BTC.averageEntryPrice).toBe(40000);
    });
});
