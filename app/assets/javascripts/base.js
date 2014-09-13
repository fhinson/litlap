$(document).ready(function(){
  $(".img-brd").click(function(){
    $(this).addClass("selected");
     $('.img-brd').not(this).each(function(){
         $(this).removeClass("selected");
     });
  });
});




var DELAY = 300, clicks = 0, timer = null, wordEl;

$(function(){
    $(".word").on("click", function(e){

        clicks++;  //count clicks
        wordEl = $(this);
        wordEl.addClass("highlight-single");

        if(clicks === 1) {

            timer = setTimeout(function() {

                if ($(".selected").length > 0){
                  if ($(".selected")[0].id == wordEl.text().trim()){
                    $(".selected").addClass("animated bounceOut");
                    wordEl.addClass("animated bounceOut");
                    setTimeout(function(){
                      $(".selected").parent(".col-md-3").remove();
                      wordEl.parent(".col-md-3").remove();
                    }, 500);
                    
                  }
                  else{
                    alert("incorrect!");
                  }
                }  //perform single-click action    
                clicks = 0;             //after action performed, reset counter

            }, DELAY);

        } else {
            clearTimeout(timer);    //prevent single-click action
            wordEl.addClass("highlight-double");
            var input = $(this).text();
            $("body").append("<audio autoplay><source src=http://tts-api.com/tts.mp3?q=" + escape(input) + " type=audio/mpeg></audio><p>\"");  //perform double-click action
            clicks = 0;             //after action performed, reset counter
        }

    })
    .on("dblclick", function(e){
        e.preventDefault();  //cancel system double-click event
    });
});