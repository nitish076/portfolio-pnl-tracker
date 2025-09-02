const tradeService = require('../src/services/tradeService');

describe('TradeService', () => {
    beforeEach(() => {
        tradeService.trades = [];
    });

    test('add a trade', () => {
        const trade = tradeService.addTrade('BTC', 'buy', 40000, 1);

        expect(trade).toHaveProperty('id');
        expect(trade.symbol).toBe('BTC');
        expect(trade.side).toBe('buy');
        expect(trade.price).toBe(40000);
        expect(trade.quantity).toBe(1);
        expect(trade).toHaveProperty('timestamp');
    });

    test('Invalid trade', () => {
        expect(() => tradeService.addTrade('', 'buy', 40000, 1)).toThrow();
        expect(() => tradeService.addTrade('BTC', 'invalid', 40000, 1)).toThrow();
        expect(() => tradeService.addTrade('BTC', 'buy', -1, 1)).toThrow();
        expect(() => tradeService.addTrade('BTC', 'buy', 40000, 0)).toThrow();
    });
});
