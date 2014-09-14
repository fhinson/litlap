$(document).ready(function(){
  $(".img-brd").click(function(){
    $(this).addClass("selected");
    $(".highlight-single").removeClass("animated shake");
    $(".img-brd").removeClass("animated shake");
     $('.img-brd').not(this).each(function(){
         $(this).removeClass("selected");
     });
    if ($(".highlight-single").length > 0){
      if ($(".selected")[0].id == $(".highlight-single").text().trim()){
        $(".selected").addClass("animated bounceOut");
        $(".highlight-single").addClass("animated bounceOut");
        setTimeout(function(){
          $(".selected").parent(".col-xs-3").hide('slow', function(){ $target.remove(); });
          $(".highlight-single").parent(".col-xs-3").hide('slow', function(){ $target.remove(); });
          $(".selected").remove();
          $(".highlight-single").remove();
        }, 500);
        
      }
      else{
        $(".highlight-single").addClass("animated shake");
        $(".selected").addClass("animated shake");
        $(".highlight-single").removeClass("highlight-single highlight-double");
        $(".selected").removeClass("selected");
      }
    }  //perform single-click action     
  });
});

var DELAY = 300, clicks = 0, timer = null, wordEl;

$(document).ready(function(){
    $(".word").on("click", function(e){
        
        clicks++;  //count clicks
        wordEl = $(this);
        wordEl.removeClass("animated shake");
        $(".img-brd").removeClass("animated shake");

        wordEl.addClass("highlight-single");
        $('.highlight-single').not(wordEl).each(function(){
          $(this).removeClass("highlight-single");
        });

        if(clicks === 1) {

            timer = setTimeout(function() {

                if ($(".selected").length > 0){
                  if ($(".selected")[0].id == wordEl.text().trim()){
                    $(".selected").addClass("animated bounceOut");
                    wordEl.addClass("animated bounceOut");
                    setTimeout(function(){
                      $(".selected").parent(".col-xs-3").hide('slow', function(){ $target.remove(); });
                      wordEl.parent(".col-xs-3").hide('slow', function(){ $target.remove(); });
                      $(".selected").remove();
                      $(".highlight-single").remove();
                    }, 500);
                    
                  }
                  else{
                    wordEl.addClass("animated shake");
                    $(".selected").addClass("animated shake");
                    wordEl.removeClass("highlight-single highlight-double");
                    $(".selected").removeClass("selected");
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

function pull_words(){
  $.ajax({
    url: '/words/pull_words',
    type:   'GET',
    data:{old_names: fixArray(old_names), old_posis: fixArray(old_posis)},
    dataType: 'json',
    success: function (data) {
      console.log(data[0]);
    },
    error: function (response) {
    }
  });
}

function fixArray(myArray){
  return JSON.parse(myArray.replace(/&quot;/g, '"'));
}