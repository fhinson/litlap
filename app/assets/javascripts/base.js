$(document).ready(function(){
  $(".word").dblclick(function () {
    var input = $(this).text();
    $("body").append("<audio autoplay><source src=http://tts-api.com/tts.mp3?q=" + escape(input) + " type=audio/mpeg></audio><p>\"");
    $(document).scrollTop($(document).height());
  });
});