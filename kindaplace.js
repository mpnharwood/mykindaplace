$(document).ready(function(){

});

function initialize() {
	getMap();
} 

function getMap() {
	map = new google.maps.Map(document.getElementById('map-canvas'), {
	    center: new google.maps.LatLng(51.65, 0.4),
	    zoom: 10,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
  	});
}


function drawAllLSOAs() {
	for (var i=0; i<contour_list.length; i++) {
		drawContour(contour_list[i].contours);
	}

}

function drawLOSA(poly_coords, colour) {
	var googleMapPolygons = [];
	var pt = 0;
	var pts_plotted = [];
	for (var p=0; p<poly_coords.length; p++) {
		googleMapPoly.push(new google.maps.LatLng(poly_coords[p].lat, poly_coords[p].lng));		
	}
	if (googleMapContours.length >0) {
		var lsoa_poly = new google.maps.Polygon({
			path: googleMapPoly, 
			geodesic: true,
    		strokeColor: colour,
    		strokeOpacity: 1.0,
    		strokeWeight: 2
		});
		contour_path.setMap(map);
	}
	
}


google.maps.event.addDomListener(window, 'load', initialize);


















