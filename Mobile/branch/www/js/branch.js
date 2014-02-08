//Logo positioning

$(document).ready(positionLogo);

$(window).resize(positionLogo);

function positionLogo() {
	$(".logo").css("left", ($(window).width() / 2) - 70);
}

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

/*Signup Process*/

$("#signup-button1").click(function() {
	if (
		$("#signup-fullname").val() == "" ||
		$("#signup-username").val() == "" ||
		$("#signup-password1").val() == "" ||
		$("#signup-password2").val() == ""
	) {
		return false;
	} else {
		$.mobile.changePage("#kid-signup2", { transition: "fade" } );
	}
});
		
$("#signup-button2").click(function() {
	if (
		$("#signup-zipcode").val() == "" ||
		$("#signup-phone").val() == "" ||
		$("#signup-email").val() == "" ||
		$("#signup-bday-month").val() == "" ||
		$("#signup-bday-day").val() == "" ||
		$("#signup-bday-year").val() == ""
	) {
		alert("Please enter all information");
		return false;
	} else {
		$.post("http://ec2-54-200-118-175.us-west-2.compute.amazonaws.com:3000/api/v1/students", {
			full_name:$("#signup-fullname").val(),
			username:$("#signup-username").val(),
			password:$("#signup-password1").val(),
			zipcode:$("#signup-zipcode").val(),
			phone:$("#signup-phone").val(),
			email:$("#signup-email").val(),
			dob:$("#signup-bday-month").val() + "-" + $("#signup-bday-day").val() + "-" + $("#signup-bday-year").val()
		});
	}
});

//Specific group page buttons

$("#specific-group-upcoming-button").click(function() {
	$("#specific-group-about-container").hide();
	$("#specific-group-event-container").fadeIn();
});

$("#specific-group-past-button").click(function() {
	$("#specific-group-about-container").hide();
	$("#specific-group-event-container").fadeIn();
});

$("#specific-group-about-button").click(function() {
	$("#specific-group-event-container").hide();
	$("#specific-group-about-container").fadeIn();
});

//Click to specific event

$(".event-link").click(function() {
	$.mobile.changePage("#specific-event", { transition: "pop" } );
});

//Click to specific group

$(".groups-tile").click(function() {
	$.mobile.changePage("#specific-group", { transition: "pop" } );
});