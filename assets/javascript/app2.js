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
     createCard(response); 
    });
    
  }
  
  //
  // Create button click handler to get the form submission,
  // and call the AJAX function, passing the name of the new stock
  //
  $("#search").click(function() {
    var symbol = $("#inputSymbol").val();
    getSymbol(symbol);
    
//*** */create function for the current date in the same format as the API***\\
  });

  //create a card with different metrics//
  function createCard(response) {
    // Create a new boostrap card container
    var article = $("<article>");
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
    article.append("Open: ", dailyOpen);

    var dailyHigh = $("<p>");
    dailyHigh.addClass("card-text");
    dailyHigh.html(response["Time Series (Daily)"]["2019-07-30"]["2. high"]);
    article.append("Daily High: ", dailyHigh);

    var dailyLow = $("<p>");
    dailyLow.addClass("card-text");
    dailyLow.html(response["Time Series (Daily)"]["2019-07-30"]["3. low"]);
    article.append("Daily Low: ", dailyLow);

    var dailyClose = $("<p>");
    dailyClose.addClass("card-text");
    dailyClose.html(response["Time Series (Daily)"]["2019-07-30"]["4. close"]);
    article.append("Close: ",dailyClose);

    // Append the new card to the HTML body
    $("#stockData").append(article);

  }