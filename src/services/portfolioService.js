const tradeService = require('./tradeService');

class PortfolioService {
    constructor() {
        this.portfolio = {};
    }

    calculatePortfolio() {
        this.portfolio = {};

        const trades = tradeService.getAllTrades();

        const positions = {};

        for (const trade of trades) {
            const { symbol, side, price, quantity } = trade;

            if (!positions[symbol]) {
                positions[symbol] = [];
            }

            if (side === 'buy') {
                positions[symbol].push({ price, quantity });
            } else {
                let remainingSellQuantity = quantity;

                while (remainingSellQuantity > 0 && positions[symbol].length > 0) {
                    const position = positions[symbol][0];

                    if (position.quantity <= remainingSellQuantity) {
                        remainingSellQuantity -= position.quantity;
                        positions[symbol].shift();
                    } else {
                        position.quantity -= remainingSellQuantity;
                        remainingSellQuantity = 0;
                    }
                }
            }
        }


        /**
         * Avg Value is used to compute the EntryPrice.
         * This is avg value, since i am using FIFO accounting, assuming system is always in sync.
         * Have avoided short selling options here, meaning the position count can always be positive.
         * **/
        for (const [symbol, position] of Object.entries(positions)) {
            if (position.length > 0) {
                const totalQuantity = position.reduce((sum, pos) => sum + pos.quantity, 0);
                const totalValue = position.reduce((sum, pos) => sum + (pos.price * pos.quantity), 0);
                const averageEntryPrice = totalQuantity > 0 ? totalValue / totalQuantity : 0;

                this.portfolio[symbol] = {
                    totalQuantity,
                    averageEntryPrice,
                    position
                };
            }
        }

        return this.portfolio;
    }

    getPortfolio() {
        return this.calculatePortfolio();
    }
}

module.exports = new PortfolioService();
