$(document).ready(function(){
  $(".word").dblclick(function () {
    var input = $(this).text();
    $("body").append("<audio autoplay><source src=http://tts-api.com/tts.mp3?q=" + escape(input) + " type=audio/mpeg></audio><p>\"");
  });

  $(".img-brd").click(function(){
    $(this).css("border-color", "rgba(242, 120, 75, 0.8)");
     $('.img-brd').not(this).each(function(){
         $(this).css("border-color", "rgba(92, 151, 191, 0.3)")
     });
  });
});