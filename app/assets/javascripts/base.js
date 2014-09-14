var correct = 0;
var level = 1;

function initProgress(value){
    $(".progress-bar").attr("data-transitiongoal", value);
    $('.progress .progress-bar').progressbar({
        transition_delay: 500
    });
};

$(document).ready(function(){

  initProgress(0);

  $(".img-brd").click(function(){
    $(this).addClass("selected");
    $(".highlight-single").removeClass("animated shake");
    $(".img-brd").removeClass("animated shake");
     $('.img-brd').not(this).each(function(){
         $(this).removeClass("selected");
     });
    if ($(".highlight-single").length > 0){
      if ($(".selected")[0].id == $(".highlight-single").text().trim()){
        if (correct == 3){
          $(".selected").parent(".col-xs-3").hide();
          $(".highlight-single").parent(".col-xs-3").hide();
        }
        else{
          $(".selected").addClass("animated bounceOut");
          $(".highlight-single").addClass("animated bounceOut");
          $(".selected").parent(".col-xs-3").hide('slow');
          $(".highlight-single").parent(".col-xs-3").hide('slow');
        }

        $(".selected").removeClass("selected");
        $(".highlight-single").removeClass("highlight-single");
        $(".highlight-double").removeClass("highlight-double");
        correctLogic();
      }
      else{
        incorrect();
        $(".highlight-single").addClass("animated shake");
        $(".selected").addClass("animated shake");
        $(".highlight-single").removeClass("highlight-single highlight-double");
        $(".selected").removeClass("selected");
      }
    }  //perform single-click action     
  });
});

var DELAY = 300, clicks = 0, timer = null, wordEl;

function correctLogic(){
  correct++;
  pointNotif(5*level);
  if (correct == 4){
    pull_words();
  }
}

function incorrect(){
  pointNotif(-5*level);
}

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
                    if (correct == 3){
                      $(".selected").parent(".col-xs-3").hide();
                      wordEl.parent(".col-xs-3").hide();
                    }
                    else{
                      $(".selected").addClass("animated bounceOut");
                      wordEl.addClass("animated bounceOut");

                      $(".selected").parent(".col-xs-3").hide('slow');
                      wordEl.parent(".col-xs-3").hide('slow');
                    }

                    $(".selected").removeClass("selected");
                    $(".highlight-single").removeClass("highlight-single");
                    $(".highlight-double").removeClass("highlight-double");
                    correctLogic();
                  }
                  else{
                    incorrect();
                    wordEl.addClass("animated shake");
                    $(".selected").addClass("animated shake");
                    wordEl.removeClass("highlight-single highlight-double");
                    $(".selected").removeClass("selected");
                  }
                }  //perform single-click action    
                clicks = 0;             //after action performed, reset counter

            }, DELAY);

        } else {
            pointNotif(-3*level);
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
  correct = 0;
  
  $(".img-brd").removeClass("animated shake bounceOut");
  $(".word").removeClass("animated shake bounceOut");

  $.ajax({
    url: '/words/pull_words',
    type:   'GET',
    data:{oldposis: JSON.stringify(fixArray(old_posis)), level:level},
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      randomizedData = shuffler(arrayize(data[0]));
      for (var i = 0; i < data[0].length; i++){
        $($(".img-brd")[i]).attr('src', "assets/words/" + data[1][i] + ".jpg");
        $($(".img-brd")[i]).attr('id', data[0][i]);
        $($(".word")[i]).text(randomizedData[i]);
        //old_posis = JSON.stringify(JSON.parse(JSON.stringify(fixArray(old_posis) + ","))+ data[1]);
        //console.log(old_posis);
      }
    
      $(".col-xs-3").addClass("animated fadeInUp");
      $(".col-xs-3").show();
      
    },
    error: function (response) {
    }
  });
}

function fixArray(myArray){
  return JSON.parse(myArray.replace(/&quot;/g, '"'));
}

function pointNotif(amount){
  setTimeout(function(){
    $(".tally").text((parseInt($(".tally").text()) + amount).toString() + " points");
    initProgress((parseInt($(".tally").text()) % 100) / (level+1));
    $(".levelnotif").text("level " + level.toString());
    $(".levelaward").text("You've reached level " + level.toString() + "!");
    var tempLevel = level;
    level = Math.floor(1 + (parseInt($(".tally").text()) / 100));
    if (tempLevel != level)
      $("#level").modal("show");
    var display = amount > 0 ? ("(+" + amount.toString() + ")") : ("(" + amount.toString() + ")");
    var green = amount > 0 ? true : false;
    $(".pointnotif").text(display);
    if (green == true){
      $(".pointnotif").css("color", "green");
    }
    else{
      $(".pointnotif").css("color", "red");
    }
    $(".pointnotif").addClass("animated zoomIn");
    $(".pointnotif").show();
  }, 700);

  $(".pointnotif").fadeOut();
  $(".pointnotif").removeClass("animated zoomIn");
}