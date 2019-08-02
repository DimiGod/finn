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
    

  });

  //create a card with different metrics//
  function createCard(response) {
//create today's date and format it to the same date as the API//
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
    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
    var today = formatDate();
    console.log(today);
    var series= response["Time Series (Daily)"];
    var dailyOpen = $("<p>");
    dailyOpen.addClass("card-text");
    dailyOpen.html(response["Time Series (Daily)"][today]["1. open"]);
    article.append("Open: ", dailyOpen);

    var dailyHigh = $("<p>");
    dailyHigh.addClass("card-text");
    dailyHigh.html(response["Time Series (Daily)"][today]["2. high"]);
    article.append("Daily High: ", dailyHigh);

    var dailyLow = $("<p>");
    dailyLow.addClass("card-text");
    dailyLow.html(response["Time Series (Daily)"][today]["3. low"]);
    article.append("Daily Low: ", dailyLow);

    var dailyClose = $("<p>");
    dailyClose.addClass("card-text");
    dailyClose.html(response["Time Series (Daily)"][today]["4. close"]);
    article.append("Close: ",dailyClose);

    // Append the new card to the HTML body
    $("#stockData").append(article);

  }