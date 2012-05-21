$(document).ready(function() {
  
  $.ajaxSetup({async:false});
  
  var current = {
    type: null,
    id: null,
    value: null
  }
  
  update($("#floors .active").attr("id"), $("#views .active").attr("id"));
  
  $("#floors li").click(function(event) {
    $("#floors li").removeClass("active");
    $(this).addClass("active");
    update($(this).attr("id"), $("#views .active").attr("id"));
  });

  $("#views li").click(function(event) {
    $("#views li").removeClass("active");
    $(this).addClass("active");
    update($("#floors .active").attr("id"), $(this).attr("id"));
  });
  
  $(".cancel").click(function(event) {
    $(".modal").each(function() {
      $(this).hide();
    });
  });
  
  $(".btn-success").click(function(event) {
    setValue(current.id, current.value);
    $(".modal").each(function() {
      $(this).hide();
    });
  });
  
  $(".temperature").live('click', function() {
    current.type = "temperature";
    current.id = $(this).attr("id");
    current.value = $(this).html().replace(/[^\d.]/g, "");
    $("#temp-slider").slider("value", current.value);
    $("#temp-modal .val").html(current.value);
    $("#temp-modal").show();
  });
  
  $(".humidity").live('click', function() {
    current.type = "humidity";
    current.id = $(this).attr("id");
    current.value = $(this).html().replace(/[^\d.]/g, "");
    $("#hum-slider").slider("value", current.value);
    $("#hum-modal .val").html(current.value);
    $("#hum-modal").show();
  });
  
  $(".object").live('click', function() {
    var new_value;
    if ($(this).hasClass("on")) {
      new_value = "off";
    } else {
      new_value = "on";
    }
    setValue($(this).attr("id"), new_value);
  });
  
  $("#temp-slider").slider({
    value:20,
    min: 10,
    max: 30,
    step: 1,
    slide: function( event, ui ) {
      $("#temp-modal .val").html(ui.value);
      current.value = ui.value;
    }
  });
  
  $("#hum-slider").slider({
    value: 50,
    min: 25,
    max: 75,
    step: 1,
    slide: function( event, ui ) {
      $("#hum-modal .val").html(ui.value);
      current.value = ui.value;
    }
  });
  
  setInterval(function() {
    $(".notification").each(function() {
        if ($(this).hasClass("transparent")) {
          $(this).removeClass("transparent");
        } else {
          $(this).addClass("transparent");
        }
      }
    );
  }, 500);
  
//  setValue('parter_goscinny_1', 'on');
  
});