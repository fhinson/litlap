// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){
  setTimeout(function(){
    $(".push").addClass("animated fadeInUp");
    $(".push").show();
  }, 700);
});

function fadeOutImage(obj){
  $(".product").removeClass("animated fadeInDown fadeInUp fadeOutUp fadeOutDown");
  $(".product").addClass("animated " + obj);
  getShoe(obj);
  setTimeout(function(){
    showProduct(obj);
  }, 1000);
}

function showProduct(obj){
  $(".product").removeClass("animated fadeOutUp fadeOutDown");
  $(".product").addClass("animated " + (obj == "fadeOutDown" ? "fadeInDown" : "fadeInUp"));
}

function getShoe(obj){
  $.ajax({
    url: '/users/' + id + '/get_shoe',
    type:   'GET',
    data:{vote: 1, shoe_id: shoeId},
    dataType: 'json',
    success: function (data) {
      $(".shoe-title").children("a").attr("href", data[1]);
      $(".shoe-title").children("a").text(data[0]);
      $('.shoe-image').attr('src', data[2]);
      $('.shoe-price').text("$" + data[3]);
      $('.shoe-description').text(data[4]);
    },
    error: function (response) {
    }
  });
}

function runScript(e) {
    if (e.keyCode == 13) {
        saveName();
        return false;
    }
}

$(document).ready(function(){
  $("select.inputter2").change(function(){
    $(".welcome").removeClass("animated fadeIn");
    $.ajax({
      url: '/users/' + id + '/set_gender',
      type:   'GET',
      data: {gender: $(this).children(":selected").html()},
      success: function (data) {
        hideText("Awesome. What's your favorite sport?");
        $(".inputter2").hide();
        $(".inputter3").show();
      },
      error: function (response) {
      }
    });
  });
})

$(document).ready(function(){
  $("select.inputter3").change(function(){
    $(".welcome").removeClass("animated fadeIn");
    $.ajax({
      url: '/users/' + id + '/set_sport',
      type:   'GET',
      data: {sport: $(this).children(":selected").html()},
      success: function (data) {
        hideText("Awesome. What's your favorite type of music?");
        $(".inputter3").hide();
        $(".inputter4").show();
      },
      error: function (response) {
      }
    });
  });
})

$(document).ready(function(){
  $("select.inputter4").change(function(){
    $(".welcome").removeClass("animated fadeIn");
    $.ajax({
      url: '/users/' + id + '/set_music',
      type:   'GET',
      data: {music: $(this).children(":selected").html()},
      success: function (data) {
        getShoe();
        $(".push").addClass("animated fadeOut");
        $(".push").hide();
        setTimeout(function(){
          $(".recommendation-section").addClass("animated fadeIn");
          $(".recommendation-section").show();
        }, 750);
      },
      error: function (response) {
      }
    });
  });
})

function saveName(){
  $.ajax({
    url: '/users/' + id + '/set_name',
    type:   'GET',
    data: {name: $(".inputter").val()},
    success: function (data) {
      hideText("Great. What range do you fit into?");
      $(".inputter").hide();
      $(".inputter2").show();
    },
    error: function (response) {
    }
  });
}

function hideText(text){
  $(".welcome").text(text);
  $(".welcome").addClass("animated fadeIn");
}
