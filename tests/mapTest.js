function initMap() {
	map = new google.maps.Map(document.getElementById("mapz"), {
		center: {lat:47.6097, lng:-122.3331},
		zoom:9
	});
	var marker = new google.maps.Marker({
    	position: {lat:47.6097, lng:-122.3331},
    	map: map,
    	draggable:true,
    	title:"Drag me!"
	});
}