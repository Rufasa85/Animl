var map;
var marker;

function initMap() {
	map = new google.maps.Map(document.getElementById("sightingsMap"), {
		center: {lat:47.6097, lng:-122.3331},
		zoom:9
	});
	marker = new google.maps.Marker({
    	position: {lat:47.6097, lng:-122.3331},
    	map: map,
    	draggable:true,
    	title:"sighting"
	});
	lat = document.getElementById('latitude');
	lng = document.getElementById('longitude');
	marker.addListener('dragend', function (marker) {
		lat.value = marker.latLng.lat();
		lng.value = marker.latLng.lng();	
	})
}