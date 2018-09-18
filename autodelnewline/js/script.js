$(function() {
	$textarea = $('textarea');
	$textarea.focus();
	$textarea.focusout(function() {
		$textarea.select();
		$textarea.focus();
	});

	$textarea.bind('input propertychange', function() {
		$textarea.val( $textarea.val().replace(/\n/g, ' ').replace(/ +/g, ' ').replace(/- /g, '') )
		$textarea.select();
		document.execCommand('copy');
	});
});
