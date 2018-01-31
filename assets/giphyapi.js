$( document ).ready(function() {
// An array of places to start. these will be static and new places added to array dynamically
// I changed my project a couple times to get a theme I liked. I wanted to change the var to "places"
// but doing so ruined my code even when changing elsewhere. 

var actions = ["Tahiti", "Sahara", "Great Wall of China", "Pyramids", "Jungle", "Taj Mahal"];

// Function that displays gif buttons for the static gifs
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

function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; 
    }
    actions.push(action);

    displayGifButtons();
    return false;
    });
}


function removeLastButton(){
    $("removeGif").on("click", function(){
    actions.pop(action);
    displayGifButtons();
    return false;
    });
}
// displays all of the gifs
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

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
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
// Calling Functions 
displayGifButtons(); 
addNewButton();
removeLastButton();

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

// Alternative AJAX call and function for the start/stop of gifs. Used a regex feature that worked 
// with a singular gif but I couldn't figure out how to make it work on the loop. Switched to the method we used
// in class that David showed us. 

 // var url = "";
 //    $.ajax({
 //      url: queryURL,
 //      method: 'GET'
 //    }).done(function(response) {
 //      console.log(response.data[0].images.original_still.url);
 //      url = response.data[0].images.original_still.url; 
 //      var newImage = $('<img class="gif notPlaying">');
 //      newImage.attr("src", response.data[0].images.original_still.url);
 //      $("#gifArea").append(newImage);

 //    });

 //    $(document).on("click", ".gif", function() {
 //        console.log($(this));
 //        //debugger;
 //        if($(this).hasClass("notPlaying")){
 //            $(this).removeClass("notPlaying");
 //            $(this).attr('src', url.replace(/\_s.gif/i, ".gif"));
 //            console.log(url);
 //        }
 //        else{
 //             $(this).addClass('notPlaying');
 //            $(this).attr('src', url.replace(/\.gif/i, ".gif"))