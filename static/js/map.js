var map;
function initMap() {
	var startingPoint;
	if(sightings[0]) {
		startingPoint = {lat:parseFloat(sightings[0].lat), lng:parseFloat(sightings[0].lng)};
	}
	else{
		startingPoint =  {lat:parseFloat(reportedSightings[0].lat), lng:parseFloat(reportedSightings[0].lng)};
	}
	map = new google.maps.Map(document.getElementById("mapz"), {
		center: startingPoint,
		zoom:2
	});
	sightings.forEach(function(sighting){
		var position = {lat: parseFloat(sighting.lat), lng:parseFloat(sighting.lng)};	
		var marker = new google.maps.Marker({
    		position:position,
    		map: map
		});
	});
	reportedSightings.forEach(function(report){
		var position = {lat: parseFloat(report.lat), lng:parseFloat(report.lng)};	
		var marker = new google.maps.Marker({
    		position:position,
    		map: map,
    		icon: 'http://library.csun.edu/images/google_maps/marker-blue.png'
		});
	})
}