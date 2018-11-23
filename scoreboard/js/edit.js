$(function() {
	$("#load_json").on("click", function() {
		var s = JSON.parse($("#json").val());
		setLocalStorage(s);
	});

	$("#delete").on("click", function() {
		localStorage.clear();
	});
});

