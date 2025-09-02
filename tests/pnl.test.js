const tradeService = require('../src/services/tradeService');
const pnlService = require('../src/services/pnlService');

describe('PnLService', () => {
    beforeEach(() => {
        tradeService.trades = [];
    });

    test('zero PnL for empty portfolio', () => {
        const pnl = pnlService.getPnl();

        expect(Object.keys(pnl.realized).length).toBe(0);
        expect(Object.keys(pnl.unrealized).length).toBe(0);
    });

    test('PnL after buy and sell', () => {
        tradeService.addTrade('BTC', 'buy', 40000, 1);
        tradeService.addTrade('BTC', 'buy', 42000, 1);
        tradeService.addTrade('BTC', 'sell', 43000, 1);

        const pnl = pnlService.getPnl();

        expect(pnl.realized.BTC).toBeCloseTo(3000);
        expect(pnl.unrealized.BTC).toBeCloseTo(-2000);

        pnlService.updateLatestPrice('BTC', 44000);
        const updatedPnl = pnlService.getPnl();

        expect(updatedPnl.unrealized.BTC).toBeCloseTo(2000);
    });
});
