function getBuilding() {
  var building;
  
  $.ajax({
    type: "GET",
    url: "xml/building.xml?nocache=" + Math.round((new Date()).getTime()) ,
    dataType: "xml",
    async: false,
    success: function(xml) {
      building = $(xml);
    }
  });
  
  return building;  
}

function setValue(id, value) {
  $.post("backend.py", { id: id, value: value},
   function(data) {
     console.log(data);
     update($("#floors .active").attr("id"), $("#views .active").attr("id"));
   });
}

function update(floor, view) {
  var building = getBuilding();
  
  // set an image with projection
  if ($("#view").css("background-image").indexOf(building.find("#" + floor + " plan").text() + ")") === -1) {
    $("#view").css("background-image", "url(img/" + building.find("#" + floor + " plan").text() + ")"); 
  }
  
  // set the view
  changeView(view, building, floor);
}

function addElement(html, x, y) {
  x = parseInt(x) + $("#view").position().left;
  y = parseInt(y) + $("#view").position().top;
  var el = $(html);
  $("#view").append(el);
  el.css({
      position: "absolute",
      top: y + "px",
      left: x + "px"
  }).show();
}

function changeView(view, building, floor) {
  
  $("#view").empty();
  
  building.find("#" + floor + " room").each(
    function() {
      
      // coordinates of the room
      var room_name = $(this).attr("name");
      var room_x = $(this).attr("x");
      var room_y = $(this).attr("y");
      
      switch (view) {
        
        case "temperature": 
          addElement(tempTemplate($(this).find("temperature").text(),
                                  floor + "_" + room_name + "_temperature"), 
                     room_x, 
                     room_y);
                     console.log("dodalem");
          break;
          
        case "humidity": 
          addElement(humTemplate($(this).find("humidity").text(),
                                 floor + "_" + room_name + "_humidity"), 
                     room_x, 
                     room_y);
          break;
          
        case "objects": 
          $(this).find("objects").children().each(
            function() {
              addElement(objTemplate($(this)[0].tagName, 
                                     $(this).text(),
                                     floor + "_" + room_name + "_" + $(this).attr("index")),
                         $(this).attr("x"),
                         $(this).attr("y"));
            }
          );
          break;
          
        case "notifications": 
          addElement(notifTemplate($(this).find("notifications burglary").text(),
                                   $(this).find("notifications fire").text()),
                     room_x,
                     room_y);
          break;
          
      }
    }
  );
}
