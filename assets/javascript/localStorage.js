/**
 * @type {Object}
 * savedPortfolio is a user's portfolio that got imported from the localStorage;
 * Author : Sam I.
 */
var savedPortfolio = JSON.parse(localStorage.getItem("portfolio"));

for(let i = 0; i < savedPortfolio.myStock.length; i++) {
    getSymbol(savedPortfolio.myStock[i]);
}

/**
 * @class
 * This class is to store the user's stock data.
 * Author : Sam I.
 */
class StockOwned {
    constructor(symbol, owned) {
        this.symbol= symbol;
        this.owned = owned;
    }
}


 // TEST DATA!

/**
 * @type {Object}
 * This is the portfolio Object. It contains the total stock's current value, what's the net gain is,
 * top performing stock, worst performing stock, bank account, and the stock owned via StockOwned class;
 * Author : Sam I.
 */
var portfolio = {
    currentValue : null,
    netGain : null,
    top : null,
    low : null,
    bank : 0,
    myStock : [],
    chart : null
};

// Saving the data to the localstorage. TODO: Recommended to be saved every time there's a change in data.
// localStorage.setItem("portfolio", JSON.stringify(portfolio));