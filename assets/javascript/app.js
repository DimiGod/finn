function getSymbol(stockSymbol) {


    // queryURL endpoint for Alpha Vantage (Daily)API
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&apikey=0V05X9O48C7R2P6N";
    console.log(queryURL)
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

//
// Create button click handler to get the form submission,
// and call the AJAX function, passing the name of the new stock
//

var v1= [];

var v2= [];


var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
      ]
    }
});
$("#search").click(function () {
    var symbol = $("#inputSymbol").val();
    getSymbol(symbol);


});

//create a card with different metrics//

function createCard(response, response2) {
    //create today's date and format it to the same date as the API//
    // Create a new boostrap card container
    var article = $("<article>");
    article.addClass("card");
    article.addClass("stockCard")

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
    var startValue= response2["Monthly Time Series"][monthDate]["1. open"];
    v1.push(response2["Monthly Time Series"][monthDate]["1. open"]);

    var dailyClose = $("<p>");
    dailyClose.addClass("card-text");
    dailyClose.html(response["Time Series (Daily)"][date]["4. close"]);
    article.append("Current Value (Daily Close): ", dailyClose);
    var currentValue= response["Time Series (Daily)"][date]["4. close"];
    v2.push(response["Time Series (Daily)"][date]["4. close"]);

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

    // var chart = c3.generate({
    //     bindto: '#chart',
    //     data: {
    //       columns: [
    //         [stockName, startValue, currentValue],
            
    //       ]
    //     }
    // });
    chart.load({
        columns: [
            [response["Meta Data"]['2. Symbol'], startValue, currentValue]
        ]
    });

    function sum(total, num) {
        return parseFloat(total) + parseFloat(num);
    }
    
    $("#startingValue").text(v1.reduce(sum));
    $("#currentValue").text(v2.reduce(sum));

}