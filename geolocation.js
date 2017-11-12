var lat;
var lng;

if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
          });
} else {
          // Browser doesn't support Geolocation
          lat = 40.797873;
          lng = -73.960763;
}
      