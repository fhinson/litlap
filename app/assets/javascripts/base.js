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

function shuffler(array){
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

function arrayize(myObj){
  var array = $.map(myObj, function(value, index) {
    return [value];
  });
  return array;
}

function pull_words(){
  $.ajax({
    url: '/words/pull_words',
    type:   'GET',
    data:{oldposis: JSON.stringify(fixArray(old_posis))},
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      randomizedData = shuffler(arrayize(data[0]));
      console.log(randomizedData);
      console.log(data[0]);
      console.log(data[1]);
      for (var i = 0; i < data[0].length; i++){
        $($(".img-brd")[i]).attr('src', "assets/words/" + data[1][i] + ".jpg");
        $($(".img-brd")[i]).attr('id', data[0][i]);
        $($(".word")[i]).text(randomizedData[i]);
        //old_posis = JSON.stringify(JSON.parse(JSON.stringify(fixArray(old_posis) + ","))+ data[1]);
        //console.log(old_posis);
      }
    },
    error: function (response) {
    }
  });
}

function fixArray(myArray){
  return JSON.parse(myArray.replace(/&quot;/g, '"'));
}