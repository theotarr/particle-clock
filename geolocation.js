var latlnglocation = 'New York';

if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            latlnglocation = position.coords.latitude+','+position.coords.longitude;
          });
} 