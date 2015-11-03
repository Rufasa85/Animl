var map;

function initMap() {
	map = new google.maps.Map(document.getElementById("mapz"), {
		center: {lat:parseFloat(sightings[0].lat), lng:parseFloat(sightings[0].lng)},
		zoom:9
	})
	sightings.forEach(function(sighting){
		var position = {lat: parseFloat(sighting.lat), lng:parseFloat(sighting.lng)};	
		var marker = new google.maps.Marker({
    		position:position,
    		map: map
	})
  });
}