/**
 * @class
 * This class is to store the user's stock data.
 * Author : Sam I.
 */
class StockOwned {
    constructor(symbol, owned) {
        this.symbol= symbol.toUpperCase();
        this.owned = owned;
    }
}

/**
 * @type {Object}
 * savedPortfolio is a user's portfolio that got imported from the localStorage;
 * Author : Sam I.
 */

var savedPortfolio = JSON.parse(localStorage.getItem("portfolio"));

if (savedPortfolio == null)
    savedPortfolio = {
        currentValue : null,
        netGain : null,
        top : null,
        low : null,
        bank : 0,
        myStock : [],
        chart : null
    };

for(let i = 0; i < savedPortfolio.myStock.length; i++) {
    let holder = savedPortfolio.myStock[i];
    getSymbol(holder.symbol);
}

portfolio = savedPortfolio;

function getSymbol(stockSymbol) {


    // queryURL endpoint for Alpha Vantage (Daily)API
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&apikey=0V05X9O48C7R2P6N";
    console.log(queryURL);
    // AJAX call to Alpha Vantage API with promise and callback handler
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log("hello");
        $.ajax({
            url:"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + stockSymbol +"&apikey=0V05X9O48C7R2P6N",
            method: "GET"
        }).done(function (response2){
            console.log("hello");
            createCard(response, response2);
        });
        // createCard(response);
    });

}
console.log(portfolio);
//
// Create button click handler to get the form submission,
// and call the AJAX function, passing the name of the new stock
//



$("#search").click(function () {
    var symbol = $("#inputSymbol").val();
    getSymbol(symbol);
    portfolio.myStock.push(new StockOwned(symbol.toUpperCase(), 1));
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
});

//create a card with different metrics//

function createCard(response, response2) {
    //create today's date and format it to the same date as the API//
    // Create a new boostrap card container
    var article = $("<article>");
    article.addClass("card");
    article.addClass("stockCard");

    // Create a new card body container
    var cardBody = $("<div>");
    cardBody.addClass("card-body");

    // Add stock name
    var stockName = $("<h1>");
    stockName.addClass("card-title");
    console.log(response)
    stockName.html(response["Meta Data"]['2. Symbol']);
    article.append(stockName);

    // Add information/ metrics
    //date (daily) function//
    var date = response["Meta Data"]["3. Last Refreshed"];
    console.log(date)
    var todayDate = $("<p>");
    todayDate.addClass("card-text");
    todayDate.html(response["Meta Data"]["3. Last Refreshed"]);
    article.append(todayDate);
//end date (daily) function//

//date function (monthly)//
    var monthDate = response2["Meta Data"]["3. Last Refreshed"];
    var series = response2["Monthly Time Series"];
    var monthOpen = $("<p>");
    monthOpen.addClass("card-text");
    monthOpen.html(response2["Monthly Time Series"][monthDate]["1. open"]);
    article.append("Starting Value (Monthly Open): ", monthOpen);
    console.log(monthOpen);

    var dailyClose = $("<p>");
    dailyClose.addClass("card-text");
    dailyClose.html(response["Time Series (Daily)"][date]["4. close"]);
    article.append("Current Value (Daily Close): ", dailyClose);

    var monthHigh = $("<p>");
    monthHigh.addClass("card-text");
    monthHigh.html(response2["Monthly Time Series"][monthDate]["2. high"]);
    article.append("Monthly High: ", monthHigh);

    var monthLow = $("<p>");
    monthLow.addClass("card-text");
    monthLow.html(response2["Monthly Time Series"][monthDate]["3. low"]);
    article.append("Monthly Low: ", monthLow);

    // Append the new card to the HTML body
    $("#stockData").append(article);

    var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
    });


}

/**
 * @type {Object}
 * This is the portfolio Object. It contains the total stock's current value, what's the net gain is,
 * top performing stock, worst performing stock, bank account, and the stock owned via StockOwned class;
 * Author : Sam I.
 */