function resizeEvents() {
	$(".event-list").height($(window).height() - 150);
}

$(document).ready(function() {
	resizeEvents();
});

$(window).resize(function() {
	resizeEvents();
});