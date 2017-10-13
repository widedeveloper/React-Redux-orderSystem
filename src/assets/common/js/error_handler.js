$(function() {
	$(window).keydown(function(e) {
		if (e.which === 27 && $('#error_handler_overlay').length) {
			$('#error_handler_overlay').remove();
		}
	});

	// $(document).off('click', '#error_handler_overlay');
	// $(document).on('click', '#error_handler_overlay', function() {
	// 	$(this).remove();
	// });

	$(document).off('click', '#error_handler_overlay_close');
	$(document).on('click', '#error_handler_overlay_close', function(event) {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		$('#error_handler_overlay').remove();
	});
});

function error_handler(errors) {
	if ($('#error_handler_overlay').length) {
		$('#error_handler_overlay').remove();
	}

	$('body').append(getUI(errors));

	$('#error_handler_overlay').fadeIn(500);
}

function getUI(errors) {
	var li = '';

	$.each(errors, function(key, value) {
		li += '<li>' + value + '</li>';
	});

	var html = '';
	html += '<div id="error_handler_overlay">';
	html += '<div class="error_handler_body"><a href="javascript:void(0);" id="error_handler_overlay_close">X</a><ul>' + li + '</ul></div>';
	html += '</div>';

	return html;
}