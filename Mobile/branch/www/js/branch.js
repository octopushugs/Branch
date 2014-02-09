//Check for login

function checkLogin() {
	if (!localStorage.getItem("branch_login")) {
		$.mobile.changePage("#kid-login");
	}
}

//Screen out un-logged in people

$(document).on("pagebeforeshow", "#feed", checkLogin);
$(document).on("pagebeforeshow", "#event-list", checkLogin);
$(document).on("pagebeforeshow", "#specific-event", checkLogin);
$(document).on("pagebeforeshow", "#groups", checkLogin);
$(document).on("pagebeforeshow", "#specific-group", checkLogin);

//Handle logout

$("#logout-button").click(function() {
	localStorage.removeItem("branch_login");
	localStorage.removeItem("branch_username");
	localStorage.removeItem("branch_zip");
	localStorage.removeItem("branch_fullname");
	localStorage.removeItem("branch_phone");
	localStorage.removeItem("branch_email");
	localStorage.removeItem("branch_dob");
	
	$.mobile.changePage("#kid-login", { transition: "turn" } );
});

//General loading functions

function showLoader() {
	$.mobile.loading('show', {
		text: 'Loading...',
		textVisible: true,
		theme: 'b'
	});
}

function hideLoader() {
	$.mobile.loading("hide");
}

//Logo positioning

$(document).ready(positionLogo);

$(window).resize(positionLogo);

function positionLogo() {
	$(".logo").css("left", ($(window).width() / 2) - 65);
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
		
		//Get timezone
		
		var currentTime = Math.round(new Date().getTime() / 1000);
		
		$.get("https://maps.googleapis.com/maps/api/timezone/json?sensor=false&location=" + position.coords.latitude + "," + position.coords.longitude + "&timestamp=" + currentTime, function(data) {
			localStorage.setItem("signup_timezone", data["timeZoneId"]);
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
		alert("Please enter all information");
		return false;
	} else {
		$.mobile.changePage("#kid-signup2", { transition: "fade" } );
	}
});
		
$("#signup-button2").click(function() {
	if (
		$("#signup-zipcode").val() == "" ||
		$("#signup-phone").val() == "" ||
		$("#signup-bday-month").val() == "" ||
		$("#signup-bday-day").val() == "" ||
		$("#signup-bday-year").val() == ""
	) {
		alert("Please enter all information");
		return false;
	} else {
		
		//Send it to the backend!
		
		$.post("http://localhost:3000/api/v1/students", {
			full_name:$("#signup-fullname").val(),
			username:$("#signup-username").val(),
			password:$("#signup-password1").val(),
			zipcode:$("#signup-zipcode").val(),
			phone:$("#signup-phone").val(),
			email:$("#signup-email").val(),
			dob:$("#signup-bday-month").val() + "-" + $("#signup-bday-day").val() + "-" + $("#signup-bday-year").val(),
			timezone: localStorage.getItem("signup_timezone")
		}, function() {
			$.mobile.changePage("#feed", { transition: "pop" } );
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

//Handle login

$("#login-submit").click(function() {
	if ($("#login-username").val() == "" || $("#login-password").val() == "") {
		alert("Please enter all information");
		return false;
	} else {
		$.post("http://localhost:3000/api/v1/login", {
			username: $("#login-username").val(),
			password: $("#login-password").val()
		}, function(data) {
			if (data == "none") {
				alert("Login failed");
				return false;
			} else {
				//Store "session" stuff for use later on
				
				localStorage.setItem("branch_login", true);
				localStorage.setItem("branch_username", data["username"]);
				localStorage.setItem("branch_zip", data["zipcode"]);
				localStorage.setItem("branch_fullname", data["full_name"]);
				localStorage.setItem("branch_phone", data["phone"]);
				localStorage.setItem("branch_email", data["email"]);
				localStorage.setItem("branch_dob", data["dob"]);
				$.mobile.changePage("#feed", { transition: "pop" } );
			}
		});
	}
});

/* AUTOLOADER PAST HERE */

$(document).on("pageshow", "#groups", function() {
	showLoader();
	$.post("http://localhost:3000/api/v1/layout/orgs", {
		zipcode: localStorage.getItem("branch_zip")
	}, function(data) {
		$("#group-tiles-container").html(data);
		hideLoader();
	}).fail(function() {
		hideLoader();
		alert("There was a connection error");
	});;
});