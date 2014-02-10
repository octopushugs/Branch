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

//Get current time

function getCurrentTime() {
	return Math.round(new Date().getTime() / 1000);
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
		
		var currentTime = getCurrentTime();
		
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
		
		showLoader();
		
		//Send it to the backend!
		
		$.ajax({
			cache: false,
			url: "http://localhost:3000/api/v1/create/",
			type: "POST",
			data: {
				full_name:$("#signup-fullname").val(),
				username:$("#signup-username").val(),
				password:$("#signup-password1").val(),
				zipcode:$("#signup-zipcode").val(),
				phone:$("#signup-phone").val(),
				email:$("#signup-email").val(),
				dob:$("#signup-bday-month").val() + "-" + $("#signup-bday-day").val() + "-" + $("#signup-bday-year").val(),
				timezone: localStorage.getItem("signup_timezone")
			},
			success: function(data) {
				hideLoader();
				$.mobile.changePage("#feed", { transition: "pop" } );
			},
			error: function() {
				hideLoader();
				alert("There was an error processing your request");
			}
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

$(document).on("click", ".event-link", function() {
	$.mobile.changePage("#specific-event", { transition: "pop" } );
});

//Click to specific group

$(document).on("click", ".groups-tile", function() {
	localStorage.setItem("group_selected", $(this).attr("id"));
	$.mobile.changePage("#specific-group", { transition: "pop" } );
});

//Handle login

$("#login-submit").click(function() {
	if ($("#login-username").val() == "" || $("#login-password").val() == "") {
		alert("Please enter all information");
		return false;
	} else {
		$.ajax({
			cache: false,
			url: "http://localhost:3000/api/v1/login/",
			type: "POST",
			data: {
				username: $("#login-username").val(),
				password: $("#login-password").val()
			},
			success: function(data) {
				hideLoader();
				
				if (data == "none") {
					alert("Login failed");
					return false;
				} else {
					//Store "session" stuff for use later on
					
					localStorage.setItem("branch_login", true);
					localStorage.setItem("branch_id", data["id"]);
					localStorage.setItem("branch_username", data["username"]);
					localStorage.setItem("branch_zip", data["zipcode"]);
					localStorage.setItem("branch_fullname", data["full_name"]);
					localStorage.setItem("branch_phone", data["phone"]);
					localStorage.setItem("branch_email", data["email"]);
					localStorage.setItem("branch_dob", data["dob"]);
					$.mobile.changePage("#feed", { transition: "pop" } );
				}
			},
			error: function() {
				hideLoader();
				alert("There was an error processing your request");
			}
		});
	}
});

//Join a group

function joinGroup(id) {
	showLoader();
	
	//Join an organization
	
	$.ajax({
		cache: false,
		url: "http://localhost:3000/api/v1/join/",
		type: "POST",
		data: {
			s_id: localStorage.getItem("branch_id"),
			o_id: id
		},
		success: function(data) {
			hideLoader();
		},
		error: function() {
			hideLoader();
			alert("There was an error processing your request");
		}
	});	
}

/* AUTOLOADER PAST HERE */

//Get different types of groups

$(document).on("pageshow", "#groups", function() {
	getOrgs("suggested");
});

$("#suggested-groups-button").click(function() {
	getOrgs("suggested");
});

$("#my-groups-button").click(function() {
	getOrgs("mine");
});

function getOrgs(type) {
	showLoader();
	
	if (type == "suggested") {
		var endpoint = "http://localhost:3000/api/v1/layout/orgs";
	} else if (type == "mine") {
		var endpoint = "http://localhost:3000/api/v1/layout/orgs";
	}
	
	//Get list of organizations either suggested or owned
	
	$.ajax({
		cache: false,
		url: endpoint,
		type: "POST",
		data: {
			zipcode: localStorage.getItem("branch_zip")
		},
		success: function(data) {
			if (data == "none") {
				hideLoader();
				$("#groups-null").show();
			} else {
				$("#group-tiles-container").html(data);
				hideLoader();
			}
		},
		error: function() {
			hideLoader();
			alert("There was an error processing your request");
		}
	});
}

//Get specific organization information

$(document).on("pageshow", "#specific-group", function() {
	showLoader();

	//Get about the organization information

	$.ajax({
		cache: false,
		url: "http://localhost:3000/api/v1/layout/orgabout",
		type: "POST",
		data: {
			orgid: localStorage.getItem("group_selected")
		},
		success: function(data) {
			hideLoader();
			$("#specific-group-join-button").attr("onClick", "joinGroup('" + localStorage.getItem("group_selected") + "');");
			$("#specific-group-banner-title").html(data["name"]);
			$("#specific-group-about-title").html("About " + data["name"]);
			$("#specific-group-about-text").html(data["description"]);
		},
		error: function() {
			hideLoader();
			alert("There was an error processing your request");
		}
	});	
});

//Grab feed stuff

$(document).on("pageshow", "#feed", function() {
	showLoader();
	
	$.ajax({
		cache: false,
		url: "http://localhost:3000/api/v1/layout/feed",
		type: "POST",
		data: {
			zipcode: localStorage.getItem("branch_zip"),
			currentTime: getCurrentTime()
		},
		success: function(data) {
			hideLoader();
			$("#feed-content").html(data);
		},
		error: function() {
			hideLoader();
			alert("There was an error processing your request");
		}
	});	
});

//Grab event list stuff

$(document).on("pageshow", "#event-list", function() {
	showLoader();
	
	$.ajax({
		cache: false,
		url: "http://localhost:3000/api/v1/layout/event-list",
		type: "POST",
		data: {
			zipcode: localStorage.getItem("branch_zip"),
			currentTime: getCurrentTime()
		},
		success: function(data) {
			hideLoader();
			$("#event-list-content").html(data);
		},
		error: function() {
			hideLoader();
			alert("There was an error processing your request");
		}
	});	
});

