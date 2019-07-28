//Alpha Vantage API Key: 0V05X9O48C7R2P6N
var savedStockList = [];
    var stockList = [];

    //
    // TO DO: Retrieve the stocks from local Storage and store in stockList array
    //

    savedStockList = JSON.parse(localStorage.getItem("movies"));

    // Display saved list of stocks

    if (Array.isArray(savedStockList)) {

      for (var i = 0; i < savedStockList.length; i++) {
        var stock = savedStockList[i];
        getSymbol(stock);
      }

    }

    function createCard(response) {
      // Create a new boostrap card container
      var article = $("<article>");
      article.addClass("card");

      // Create an image elment, add attributes, and append to figure
      var posterImage = $("<img>");
      posterImage.attr("src", response.Poster);
      posterImage.attr("alt", response.Title + " Poster");

      var moviePoster = $("<figure>");
      moviePoster.append(posterImage);
      article.append(moviePoster);

      // Create a new card body container
      var cardBody = $("<div>");
      cardBody.addClass("card-body");

      // Add stock name
      var stockName = $("<h1>");
      stockName.addClass("card-title");
      stockName.html(response.symbol);
      article.append(stockName);

      // Add information/ metrics
      var stockDescription = $("<p>");
      stockDescription.addClass("card-text");
      stockDescription.html(response.price);
      article.append(stockDescription);

      // Append the new card to the HTML body
      $("#finance-section").append(article);

    }

    function getSymbol(stockSymbol) {

      // queryURL endpoint for Alpha Vantage API
      var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + stockSymbol + "&apikey=0V05X9O48C7R2P6N";

      // AJAX call to Alpha Vantage API with promise and callback handler
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
       console.log("hello"); 
        if (response.Response === "False") {
          alert(response.Error);
        }
        else if (stockList.indexOf(response.Title) >= 0) {
          alert ("Stock already in List!")
        }
        else 
        {
          createCard(response);
          stockList.push(response.Title);

          //
          // TO DO: Save the stocks in the stockList array to Local Storage
          //
          
          localStorage.setItem("movies", JSON.stringify(stockList));

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
console.log("hello")
      var stock = $("#stock-name").val();
      getSymbol(stock);
      
    });