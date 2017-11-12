var latlnglocation = '';
var woeid = '23689635';

if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            latlnglocation = position.coords.latitude+','+position.coords.longitude;
            woeid = '';
          });
} 