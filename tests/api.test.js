const request = require('supertest');
const app = require('../src/app');
const tradeService = require('../src/services/tradeService');

describe('API', () => {

    beforeEach(() => {
        tradeService.trades = [];
    });

    test('POST /api/trades : create a new trade', async () => {
        const response = await request(app)
            .post('/api/trades')
            .send({
                symbol: 'BTC',
                side: 'buy',
                price: 40000,
                quantity: 1
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
    });

    test('GET /api/portfolio : return portfolio', async () => {
        const response = await request(app).get('/api/portfolio');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty('data');
    });

    test('GET /api/pnl : return PnL data', async () => {
        const response = await request(app).get('/api/pnl');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('realized');
        expect(response.body.data).toHaveProperty('unrealized');
    });

    test('workflow', async () => {
        //Add trade
        await request(app)
            .post('/api/trades')
            .send({
                symbol: 'BTC',
                side: 'buy',
                price: 40000,
                quantity: 1
            });
        await request(app)
            .post('/api/trades')
            .send({
                symbol: 'BTC',
                side: 'buy',
                price: 42000,
                quantity: 1
            });

        // Check portfolio
        let portfolioResponse = await request(app).get('/api/portfolio');
        expect(portfolioResponse.body.data.BTC.totalQuantity).toBe(2);
        expect(portfolioResponse.body.data.BTC.averageEntryPrice).toBeCloseTo(41000);

        //Add trade
        await request(app)
            .post('/api/trades')
            .send({
                symbol: 'BTC',
                side: 'sell',
                price: 43000,
                quantity: 1
            });

        // Check realized PnL
        let pnlResponse = await request(app).get('/api/pnl');
        expect(pnlResponse.body.data.realized.BTC).toBeCloseTo(3000);

        // Check portfolio
        portfolioResponse = await request(app).get('/api/portfolio');
        expect(portfolioResponse.body.data.BTC.totalQuantity).toBe(1);

        // Update price
        await request(app)
            .post('/api/pnl/prices')
            .send({
                prices: {
                    BTC: 44000
                }
            });

        pnlResponse = await request(app).get('/api/pnl');
        expect(pnlResponse.body.data.unrealized.BTC).toBeCloseTo(2000);
    });
});
