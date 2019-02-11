// 置換規則の関数。id名が、タグ名。
// ここに追加すれば良い
var funcs = {
	comma: function($input, $output) {
		$output.val( $input.val().replace(/。/g, '．').replace(/、/g, '，') );
	},
	delnewline: function($input, $output) {
		$output.val( $input.val().replace(/\n/g, ' ').replace(/ +/g, ' ').replace(/- /g, '') )
	},
	tab2tex: function($input, $output) {
		$output.val($input.val().split("\n").map(b => b.split("\t").map(a => isNaN(a) || a === "" ? a : "$" + a + "$").join(" & ") + " \\\\\n").join(""))
	}
};


// 入力に応じて、置換functionに基づいてリアルタイム置換する
$(function() {
	$('.input').bind('input propertychange', function() {
		var $input = $(this);
		var $parent = $(this).parent();
		var $output = $parent.children('.output');
		funcs[$parent.attr('id')]( $input, $output );
	});
});
