const tradeService = require('./tradeService');
const portfolioService = require('./portfolioService');

const LATEST_PRICES = {
    BTC: 40000,
    ETH: 2000,
    BNB : 2500,
    DOGE : 2300,
    XRP : 25
};

class PnlService {
    constructor() {
        this.realizedPnl = {};
    }

    calculatePnl() {
        const trades = tradeService.getAllTrades();
        const result = {
            realized: {},
            unrealized: {},
        };

        this.realizedPnl = {};

        const buyPositions = {};

        for (const trade of trades) {
            const { symbol, side, price, quantity } = trade;

            if (!this.realizedPnl[symbol]) {
                this.realizedPnl[symbol] = 0;
            }

            if (!buyPositions[symbol]) {
                buyPositions[symbol] = [];
            }

            if (side === 'buy') {
                buyPositions[symbol].push({ price, quantity });
            } else {
                let remainingSellQuantity = quantity;
                let sellValue = price * quantity;
                let costBasis = 0;

                while (remainingSellQuantity > 0 && buyPositions[symbol].length > 0) {
                    const oldestPosition = buyPositions[symbol][0];

                    if (oldestPosition.quantity <= remainingSellQuantity) {
                        costBasis += oldestPosition.price * oldestPosition.quantity;
                        remainingSellQuantity -= oldestPosition.quantity;
                        buyPositions[symbol].shift();
                    } else {
                        costBasis += oldestPosition.price * remainingSellQuantity;
                        oldestPosition.quantity -= remainingSellQuantity;
                        remainingSellQuantity = 0;
                    }
                }

                this.realizedPnl[symbol] += sellValue - costBasis;
            }
        }

        result.realized = { ...this.realizedPnl };

        const portfolio = portfolioService.getPortfolio();

        for (const [symbol, data] of Object.entries(portfolio)) {
            const latestPrice = LATEST_PRICES[symbol] || 0;
            const marketValue = data.totalQuantity * latestPrice;
            const costBasis = data.totalQuantity * data.averageEntryPrice;

            result.unrealized[symbol] = marketValue - costBasis;
        }

        return result;
    }

    getPnl() {
        return this.calculatePnl();
    }

    updateLatestPrice(symbol, price) {
        LATEST_PRICES[symbol] = price;
    }

    getLatestPrices() {
        return { ...LATEST_PRICES };
    }
}

module.exports = new PnlService();
