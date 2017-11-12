var latlnglocation = 'New York';
var locationFound = false;

function getmylocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      latlnglocation = position.coords.latitude+','+position.coords.longitude;
      locationFound = true;
    });
  } 
}

getmylocation();