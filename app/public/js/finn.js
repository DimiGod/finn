// function getSymbol(stockSymbol) {


//     // queryURL endpoint for Alpha Vantage (Daily)API
//     var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&apikey=0V05X9O48C7R2P6N";
//     console.log(queryURL)
//     // AJAX call to Alpha Vantage API with promise and callback handler
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).done(function (response) {
//         console.log("hello");
//         $.ajax({
//             url:"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + stockSymbol +"&apikey=0V05X9O48C7R2P6N",
//             method: "GET"
//         }).done(function (response2){
//             console.log("hello");
//             createCard(response, response2);
//         });
//         // createCard(response);
//     });

    
// }

// //
// // Create button click handler to get the form submission,
// // and call the AJAX function, passing the name of the new stock
// //

// var v1= [];

// var v2= [];


// var chart = c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: [
//       ]
//     }
// });
// $("#search").click(function () {
//     var symbol = $("#inputSymbol").val();
//     getSymbol(symbol);


// });

// //create a card with different metrics//

// function createCard(response, response2) {
//     //create today's date and format it to the same date as the API//
//     // Create a new boostrap card container
//     var article = $("<article>");
//     article.addClass("card");
//     article.addClass("stockCard")

//     // Create a new card body container
//     var cardBody = $("<div>");
//     cardBody.addClass("card-body");

//     // Add stock name
//     var stockName = $("<h1>");
//     stockName.addClass("card-title");
//     console.log(response)
//     stockName.html(response["Meta Data"]['2. Symbol']);
//     article.append(stockName);

//     // Add information/ metrics
//     //date (daily) function//
//     var date = response["Meta Data"]["3. Last Refreshed"];
//     console.log(date)
//     var newDate= date.slice(0,10)
//         console.log(newDate)
//     var newDate = $("<p>");
//     newDate.addClass("card-text");
//     newDate.html(response["Meta Data"]["3. Last Refreshed"]);
//     article.append(newDate);
//     //--------------------------------------------------------//
// //end date (daily) function//

// //date function (monthly)//
//     var monthDate = response2["Meta Data"]["3. Last Refreshed"];
    
    
//     var series = response2["Monthly Time Series"];
//     var monthOpen = $("<p>");
//     monthOpen.addClass("card-text");
//     monthOpen.html(response2["Monthly Time Series"][newDate]["1. open"]);
//     article.append("Starting Value: ", monthOpen);
//     var startValue= response2["Monthly Time Series"][newDate]["1. open"];
//     v1.push(response2["Monthly Time Series"][newDate]["1. open"]);

//     var dailyClose = $("<p>");
//     dailyClose.addClass("card-text");
//     dailyClose.html(response["Time Series (Daily)"][newDate]["4. close"]);
//     article.append("Current Value: ", dailyClose);
//     var currentValue= response["Time Series (Daily)"][newDate]["4. close"];
//     v2.push(response["Time Series (Daily)"][newDate]["4. close"]);

//     var monthHigh = $("<p>");
//     monthHigh.addClass("card-text");
//     monthHigh.html(response2["Monthly Time Series"][newDate]["2. high"]);
//     article.append("Monthly High: ", monthHigh);

//     var monthLow = $("<p>");
//     monthLow.addClass("card-text");
//     monthLow.html(response2["Monthly Time Series"][newDate]["3. low"]);
//     article.append("Monthly Low: ", monthLow);

//     // Append the new card to the HTML body
//     $("#stockData").append(article);

//     // var chart = c3.generate({
//     //     bindto: '#chart',
//     //     data: {
//     //       columns: [
//     //         [stockName, startValue, currentValue],
            
//     //       ]
//     //     }
//     // });
//     chart.load({
//         columns: [
//             [response["Meta Data"]['2. Symbol'], startValue, currentValue]
//         ]
//     });
// //the math for each number appended to the card in the html//
//     function sum(total, num) {
//         return parseFloat(total) + parseFloat(num);
//     }
//     var v1Sum = parseFloat(v1.reduce(sum));
//     var v2Sum = parseFloat(v2.reduce(sum));
//     var v3Sum = v2Sum - v1Sum;
    
//     $("#startingValue").text(v1Sum.toFixed(2));
//     $("#currentValue").text(v2Sum.toFixed(2));
//     $("#netGain").text(v3Sum.toFixed(2));

// }

//variables for stocks API IEX Cloud
const iexToken = 'pk_5ac05ab4c58a4a39a2ebf4910d6a17ab'; 
let symbol;

//variables to get the labels and series of data for the charts
let getLabels=[];
let getSeries=[];

//variables for the main stock url, the logo url, and the historic data for charts
let queryStocksURL;
let queryLogoURL;
let queryChartURL;
getSymbol();

//functions starts by clicking "stocks" button
 function getSymbol(){
    $("#buttonStocks").on("click", function() {
        symbol=$("#searchSymbol").val(); // symbol gets value entered from user
        callStock(); // do the ajax call
    });
        
}
//Ajax call for main values: stock value, P/E, and marketCap
function callStock(){
    queryStocksURL ="https://cloud.iexapis.com/v1/stock/"+symbol+"/quote?token="+iexToken;
$.ajax({
    url: queryStocksURL,
    method:"GET"
}).done(function(response){

    //show in html Company Name, stock price, p/E ratio and market cap
    $("#companyName").html(response.companyName);
    $("#livePrice").html(response.latestPrice);
    $("#peRatio").html("P/E Ratio: "+response.peRatio);
    //call function to format the market cap number so it doesn't show a 9-12 digit number
    formatNumber(response.marketCap);

});
//Ajax call for the company logo.
queryLogoURL ="https://cloud.iexapis.com/v1/stock/"+symbol+"/logo?token="+iexToken;   
$.ajax({
    url: queryLogoURL,
    method:"GET"
}).done(function(response){
    //show in html the image logo for the symbol written by user
    $("#logo").attr("src", response.url)

});
//Ajax call for the 1 month historic data of stock value
queryChartURL ="https://cloud.iexapis.com/v1/stock/"+symbol+"/chart/1m?token="+iexToken;   
$.ajax({
    url: queryChartURL,
    method:"GET"
}).done(function(response){

    //initialize labels and series as empty arrays
    getLabels=[];
    getSeries=[];
    //getting labels and close values for each day the API has stored (1 month historic data)
    for (var i=0; i<response.length; i++){
        getLabels.push(response[i].label);
        getSeries.push(response[i].close);
        console.log(response.length);
    }

    //function to print chart sending labels and series just taken from the API 
   plotChart(getLabels,getSeries);

});
}
//function to format the market cap value
function formatNumber(value) {

    //function can handle thousands, millions and billions in case they are needed
    var thousand = 1000;
    var million = 1000000;
    var billion = 1000000000;
    var trillion = 1000000000000;
    // if market cap is minor to 1000 print Mkt Cap value complete
    if (value < thousand) {
   $("#mktCap").html("Mkt Cap: "+ value);
}
    // if market cap is between one thousand and one million print Mkt Cap value divided by 1000 and rounded by 1 decimal points
    if (value >= thousand && value <= 1000000) {
         $("#mktCap").html("Mkt Cap: "+ Math.round((value/thousand)*10)/10 + 'k');  
    }
    // if market cap is between one million and one billion print Mkt Cap value divided by 1M and rounded by 1 decimal points
    if (value >= million && value <= billion) {
        $("#mktCap").html("Mkt Cap: "+ Math.round((value/million)*10)/10 + 'M');   
    }
    // if market cap is between one billion and one trillion print Mkt Cap value divided by 1B and rounded by 1 decimal points
    if (value >= billion && value <= trillion) {
        $("#mktCap").html("Mkt Cap: "+ Math.round((value/billion)*10)/10 + 'B');     
    }
    
}

// source https://gionkunz.github.io/chartist-js/index.html
// function to plot the chart, it expects two values, labels and series of data to plot
function plotChart(lab, ser){
//data object containing labels and series
var data = {
    // A labels array that can contain dates taken from API historic data
    labels: lab,
    // Our series array that contains series data arrays for stock value
    series:[ser]
  };
  
  // As options we currently set a static size of 500x300 px. 
  var options = {
    width: 500,
    height: 300
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  new Chartist.Line('.ct-chart', data, options);
}

//Create new variables for the stock prices to implement net change in portfolio information//

//var stockName= response.companyName
//var currentPrice = response.latestPrice
//var purchaseDate = *(YYYY-MM-DD)* When Someone clicks the "Add to Portfolio Button, we will store the date here."
//var p1= GET /stock/{symbol}/chart/{range}/{date}



//*** Ajax GET Requests ***/
// function getAjax(url, success) {
//     var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//     xhr.open('GET', url);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
//     };
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//     xhr.send();
//     return xhr;
// }

// // example request
// getAjax('http://foo.bar/?p1=1&p2=Hello+World', function(data){ console.log(data); });

// getAjax('http://foo.bar/?p1=1&p2=Hello+World', function(data){
//     var json = JSON.parse(data);
//     console.log(json); 
// });

//*** Ajax Post Requests ***/

// function postAjax(url, data, success) {
//     var params = typeof data == 'string' ? data : Object.keys(data).map(
//             function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
//         ).join('&');

//     var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//     xhr.open('POST', url);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
//     };
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send(params);
//     return xhr;
// }

// // example request
// postAjax('http://foo.bar/', 'p1=1&p2=Hello+World', function(data){ console.log(data); });

// // example request with data object
// postAjax('http://foo.bar/', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });
