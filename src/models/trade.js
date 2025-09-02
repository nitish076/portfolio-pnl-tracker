class Trade {
    constructor(id, symbol, side, price, quantity, timestamp) {
        this.id = id;
        this.symbol = symbol;
        this.side = side;
        this.price = price;
        this.quantity = quantity;
        this.timestamp = timestamp;
    }
}

module.exports = Trade;
