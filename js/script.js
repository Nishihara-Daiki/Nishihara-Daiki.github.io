// 置換規則の関数。id名が、タグ名。
// ここに追加すれば良い
var funcs = {
	comma: function($input, $output) {
		$output.val( $input.val().replace(/。/g, '．').replace(/、/g, '，') );
	},
	delnewline: function($input, $output) {
		$output.val( $input.val().replace(/\n/g, ' ').replace(/ +/g, ' ').replace(/- /g, '') )
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
