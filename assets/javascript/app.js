//Alpha Vantage API Key: 0V05X9O48C7R2P6N
var savedStockList;
var stockList = [];

//
// TO DO: Retrieve the stocks from local Storage and store in stockList array
//

/**
 * @type {JSON} savedStockList - Get stocks detail container from previous save.
 */
savedStockList = JSON.parse(localStorage.getItem("stocks"));

// Display saved list of stocks
for (let i = 0; i < savedStockList.length; i++) {
    getSymbol(savedStockList[i]);
}

/**
 * createCard() Creates a new Bootstrap card container for the stock that's given via Alpha Vantage API.
 * @param {object} response - Alpha Vantage JSON object being passed in after parsed by Ajax.
 */
function createCard(response) {
    // Create a new boostrap card container
    let article = $("<article>");
    article.addClass("card");

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
      var series= response["Time Series (Daily)"];
      var dailyOpen = $("<p>");
      dailyOpen.addClass("card-text");
      dailyOpen.html(response["Time Series (Daily)"]["2019-07-30"]["1. open"]);
      article.append(dailyOpen);

      var dailyHigh = $("<p>");
      dailyHigh.addClass("card-text");
      dailyHigh.html(response["Time Series (Daily)"]["2019-07-30"]["2. high"]);
      article.append(dailyHigh);

      var dailyLow = $("<p>");
      dailyLow.addClass("card-text");
      dailyLow.html(response["Time Series (Daily)"]["2019-07-30"]["3. low"]);
      article.append(dailyLow);

      var dailyClose = $("<p>");
      dailyClose.addClass("card-text");
      dailyClose.html(response["Time Series (Daily)"]["2019-07-30"]["4. close"]);
      article.append(dailyClose);


    // Append the new card to the HTML body
    $("#finance-section").append(article);

}

/**
 * getSymbol() get the stock symbol via Alpha Vantage API and add it to stockList.
 * @param {string} stockSymbol - User's input in the search bar.
 */
function getSymbol(stockSymbol) {


      // queryURL endpoint for Alpha Vantage API
      var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+stockSymbol+"&apikey=0V05X9O48C7R2P6N";
console.log(queryURL)
      // AJAX call to Alpha Vantage API with promise and callback handler
      $.ajax({

        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log("hello");
        if (response.Response === "False") {
            alert(response.Error);
        }
        else if (stockList.indexOf(response.symbol) >= 0) {
            alert ("Stock already in List!")
        }
        else 
        {
            createCard(response);
            stockList.push(response.symbol);

            //
            // TO DO: Save the stocks in the stockList array to Local Storage
            //
          
            localStorage.setItem("stocks", JSON.stringify(stockList));

        }
    });

}

// Create a bootstrap card for each item in the stockList array

for (var i = 0; i < stockList.length; i++) {

    var stock = stockList[i];
    getSymbol(stock);
      
}

//
// Create button click handler to get the form submission,
// and call the AJAX function, passing the name of the new stock
//

$("#search").click(function() {
    console.log("hello");
    var stock = $("#stock-name").val();
    getSymbol(stock);
    });

