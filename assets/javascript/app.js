var animals = ["dog", "cat", "bird", "fish", "dolphin", "bear", "squirrel", "hamster", "turtle", "dolphin", "whale"];

//Load the list of buttons onto the page.
function renderButtons() {
  //Clear out the buttons list so that duplicates are not shown
  $("#animal-buttons").empty();

  //Dynamically generate buttons for the application
  for (var i=0; i<animals.length; i++) {
    var b = $("<button>");
    //Add classes and attributes to each button so that we can use these later
    b.addClass("animal");
    b.attr("data-animal", animals[i]);
    //Add text to the buttons
    b.text(animals[i]);
    //Generate the buttons on the DOM using HTML
    $("#animal-buttons").append(b);
  };
};

//Adds the function when new animals are submitted
$("#add-animal").on("click", function(event) {
  //Stops the form from messing up and the event function lets the user click enter
  event.preventDefault();
  //Saves the user's input into a variable
  var newAnimal = $("#animal-input").val().trim();
  //Adds the user's new animal into the array animals
  animals.push(newAnimal);
  //Reloads the buttons with the new button added
  renderButtons();
});

//Loads the initial array of animal buttons
renderButtons();

//Switches out Still Images with Gif images
$(document).on("click", ".gif-img", function() {
  console.log("hi");
    //Save the selected gifs state attribute into a variable
    var state = $(this).attr("data-state");
      //If still currently when clicked, switch to animate
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        //Otherwise, switch it back
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

//Event listener waiting for user to click from list of rendered buttons
$(document).on("click", "button", function() {
//$("button").on("click", function() {

//Saves the animal button user selects into a variable to be used by the ajax call
var animalSearched = $(this).attr("data-animal");

//This is where I construct the API URL.
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearched + "&api_key=934a18cef6994f74be456253e1317a71&limit=10&rating=g";

console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);

      //Store the ajax response into an array
      var results = response.data;

      //Loop through all of the results and...
      for (var i=0; i<results.length; i++) {
        //Ignore all results that are not rated G (although this is included in the ajax call)
        if (results[i].rating == "g") {
          //Store the rating for i
          var rating =results[i].rating;

          //Create a variable 'a' and set equal to a div
          var a = $("<div>");
          //Append an attr of data-img
          a.attr("data-img");

          //Create a variable 'p' and set equal to a paragraph
          var p = $("<p>");
          //Insert the rating into the paragraph
          p.text("Rating: " + rating);

          //Create a variable to hold an img tag
          var j = $("<img>");
          j.addClass("gif-img");
          //Assign j with each gifs still image source and gif source
          j.attr("src", results[i].images.fixed_height_small_still.url);
          j.attr("data-state", "still");
          j.attr("data-still", results[i].images.fixed_height_small_still.url);
          j.attr("data-animate", results[i].images.fixed_height_small.url);
          //Prepend img and paragraphs created to the div created
          a.prepend(p);
          a.prepend(j);

          //Load the divs to the DOM
          $("#animal-gifs").prepend(a);
        };
      };
    });
});
