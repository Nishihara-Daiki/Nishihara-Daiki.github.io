$(function() {
	$textarea = $('textarea');
	$textarea.focus();
	$textarea.focusout(function() {
		$textarea.select();
		$textarea.focus();
	});

	$textarea.bind('input propertychange', function() {
		s = $textarea.val().replace(/\n/g, ' ').replace(/ +/g, ' ').replace(/- /g, '');
		s = s.replace(/Tab. /g, 'Table ').replace(/Fig. /g, 'Figure ');
		s = s.replace(/et al./g, 'et al');
		s = s.replace(/\. /g, '.\n');
		$textarea.val(s);
		$textarea.select();
		document.execCommand('copy');
	});
});
