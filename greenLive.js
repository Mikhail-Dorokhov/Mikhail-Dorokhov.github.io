//Holds the time until the train arrives in seconds
var pre_away = 0;

//Sync with the realtime predictions every 15 seconds to maintain accuracy
setInterval(function() {
  $.getJSON("https://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop=70243&format=json", function(data) {
    console.log("15 second sync")
  })
  .done(function(data) {
    pre_away = data.mode[0].route[0].direction[0].trip[0].pre_away;
  });
},15000);

//Count down seconds for prediction time.
setInterval(function() {
  //This if statement prevents the code from counting down into negative numbers
  // after the T stops running
  if (pre_away > 0) {
    pre_away = pre_away - 1;
    $("#green-in").text(pre_away);
  }

  //Refreshes predition time
  if(pre_away === 0) {
    //API call that gets a JSON object
    $.getJSON("https://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop=70243&format=json", function(data) {
      console.log("API request")
    })
    .done(function(data) {
      //Pulls out the prediction for the nearest train
      pre_away = data.mode[0].route[0].direction[0].trip[0].pre_away;
    });}
},1000);
