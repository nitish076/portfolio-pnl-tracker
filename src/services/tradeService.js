const Trade = require('../models/trade');
const { v4: uuidv4 } = require('uuid');

class TradeService {
    constructor() {
        this.trades = [];
    }

    validateTradeData(symbol, side, price, quantity) {
        if (!symbol || typeof symbol !== 'string') {
            throw new Error('Symbol must be a valid string');
        }

        if (side !== 'buy' && side !== 'sell') {
            throw new Error('Side must be either "buy" or "sell"');
        }

        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Price must be a positive number');
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }
    }

    addTrade(symbol, side, price, quantity, timestamp = Date.now()) {
        this.validateTradeData(symbol, side, price, quantity);
        const id = uuidv4();
        const trade = new Trade(id, symbol, side, price, quantity, timestamp);
        this.trades.push(trade);
        return trade;
    }

    getAllTrades() {
        return this.trades;
    }
}

module.exports = new TradeService();
