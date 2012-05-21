function tempTemplate(temperature, id) {
  var string = '<div class="element">';
  string += '<a id="' + id + '" class="temperature" href="#">';
  string += temperature + '°C';
  string += '</a>';
  string += '</div>';
  return string;
}

function humTemplate(humidity, id) {
  var string = '<div class="element">';
  string += '<a id="' + id + '" class="humidity" href="#">';
  string += humidity + '%';
  string += '</a>';
  string += '</div>';
  return string;
}

function objTemplate(type, value, id) {
  var string = '<div class="element">';
  string += '<a id="' + id + '" class="object ' + value + '" href="#">';
  string += '<img src="img/' + type + '_' + value + '.png" />';
  string += '</a>';
  string += '</div>';
  return string;  
}

function notifTemplate(burglary, fire) {
  var string = '<div class="element">';
  if (burglary === "true") {
    string += '<img class="notification burglary"src="img/notifications_burglary.png" />';
  }
  if (fire === "true") {
    string += '<img class="notification fire" src="img/notifications_fire.png" />';
  }
  string += '</div>';
  return string;  
}
