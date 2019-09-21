$(function() {
	$textarea = $('textarea');
	$textarea.focus();
	$textarea.focusout(function() {
		$textarea.select();
		$textarea.focus();
	});

	$textarea.bind('input propertychange', function() {
		s = $textarea.val().replace(/\n/g, ' ').replace(/ +/g, ' ').replace(/- /g, '');
		s = s.replace(/Tab\. /g, 'Table ').replace(/Fig\. /g, 'Figure ');
		s = s.replace(/\. /g, '.\n');
		s = s.replace(/et al\.\n/g, 'et al. ').replace(/e\.g\.\n/g, 'e.g. ');
		$textarea.val(s);
		$textarea.select();
		document.execCommand('copy');
	});
});
