//Get attribute from Google API

function extractFromAdress(components, type){
    for (var i=0; i<components.length; i++)
        for (var j=0; j<components[i].types.length; j++)
        	if (components[i].types[j]==type) return components[i].long_name;
    return "";
}

//Pull in zip code from coordinates

$(document).on("pageshow", "#kid-signup2", function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser");
	}
	
	function showPosition(position) {
		$.get("http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=" + position.coords.latitude + "," + position.coords.longitude, function(data) {
			$("#signup-zipcode").val(extractFromAdress(data.results[0].address_components, "postal_code"));
		});
	}
});