var phrasee = [];
var worde = [];
var phrasej = [];
var wordj = [];

$(function() {
	$("#go").on("click", function() {
		var $output = $("#output");
		var $errore = $("#errore");
		var $errorj = $("#errorj");
		$output.val("");
		$errorj.val("");
		$errore.val("");
		phrasee = $("#phrasee").val().split("\n");
		worde = $("#worde").val().split("\n");
		phrasej = $("#phrasej").val().split("\n");
		wordj = $("#wordj").val().split("\n");
		for(var i = 0; i < phrasee.length; i++) {
			// var nume = phrasee[i].split(" ").indexOf(worde[i]);
			var nume = phrasee[i].indexOf(worde[i]);
			var numj = phrasej[i].indexOf(wordj[i]);
			if(nume != -1 && numj != -1) {
				var s = "new Passage(\"";
				phrasee_rp = phrasee[i].replace(/"/g, '\\"');
				s += phrasej[i] + "\", " + numj + ", " + (numj + wordj[i].length - 1) + ", \"";
				s += phrasee_rp + "\", " + nume + ", " + (nume + worde[i].length - 1) + "),";
				// s += phrasee[i] + "', " + nume + ", " + nume + "),";
				$output.val($output.val() + s + '\n');
			}
			if(nume == -1){
				var s = "" + (i+1) + ". " + phrasee[i] + ", " + worde[i];
				$errore.val($errore.val() + s + '\n');
			}
			if(numj == -1) {
				var s = "" + (i+1) + ". " + phrasej[i] + ", " + wordj[i];
				$errorj.val($errorj.val() + s + '\n');
			}
		}
	});
});
