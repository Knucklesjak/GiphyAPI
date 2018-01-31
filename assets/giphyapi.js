$( document ).ready(function() {

// Static array of places to use as an examples;
var actions = ["Himalayas", "Serengeti", "Grand Canyon", "Great Wall", "Amazon River", "Taj Mahal"];


// Create function to show the gif buttons from array
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new the new place submission (submit button)
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#places-input").val().trim();
    if (action == ""){
      return false; 
    }
    actions.push(action);

    displayGifButtons();
    return false;
    });
}

// Shows function of the gifs and pulls from Giphy
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

// Dynamically adds div for gifs to go into, inside html container
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            // sets attribute to change image from a still to animated then back again
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
        
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions to start
displayGifButtons(); 
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
