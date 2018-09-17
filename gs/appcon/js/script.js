// $('#next').click( function() {
// 	$('.card').animate({
// 		'left': '0'
// 	}, 'swing');
// });
var data = [];       // データ
var data_original = [];
var num = 0;         // 現在の問題番号
var handle = 0;      // ループのsetTimeoutのハンドル
var interval = 1000; // 間隔[ms]
var range1, range2;  // 範囲
var fin = false;     // 終了フラグ
// var pause = false;

var setQues = function(li, num, eng, jpn) {
	var div = $(li).children('div');
	div[0].innerHTML = num;
	if(num !== '')
		div[0].innerHTML += '.';
	div[1].innerHTML = eng;
	div[2].innerHTML = jpn;
	$(div[2])
		.css( {'opacity': 0} )
		.animate( {
			'opacity': 1
		}, 200, 'swing');
};

var nextQues = function(li) {
	li[0].innerHTML = li[1].innerHTML;
	li[1].innerHTML = li[2].innerHTML;
	num++;
	if(num < data.length + 1)
		setQues(li[1], num-1, data[num-1][0], data[num-1][1]);
	if(num < data.length) {
		setQues(li[2], num, data[num][0], '');
	} else {
		setQues(li[2], '', '', '');
	}
	console.log(num);
	// $(li[2]).children('div')[0];
	// $(li[2]).children('div')[0].innerHTML = ''};
};

var init = function() {
	var li = $('.main ul li');
	fin = false;
	num = 0;
	setQues(li[1], '', '', '');
	setQues(li[2], num, data[num][0], '');
};

var reload = function() {
	clearTimeout(handle);
	range1 = +$('.range')[0].value;
	range2 = +$('.range')[1].value;
	interval = +$('.interval')[0].value * 1000;
	console.log(range1 + ' ' + range2 + ' ' + interval);
	data = [];
	for(var i = 0; i < range2 - range1 + 1; i++) {  // 配列値渡し
		data[i] = data_original[i+range1].concat();
	}
	console.log(data);
	data.sort( function() { return Math.random() - 0.5; } );
	// for(var i = 0; i < data.length; i++){
	// 	console.log(data[i]);
	// }
	// for(var i = 0; i < d.length; i++){
	// 	console.log(d[i]);
	// }
	init();
}

// 次の問題へ
function goNext() {
	clearTimeout(handle);
	if(num == data.length){
		console.log('clear');
		fin = true;
//		init();
		return ;
	}
	var li = $('.main ul li');
	nextQues(li);
	$(li[0]).css({
		'margin-top': '0'
	})
	.animate({
		'margin-top': '-96px'
	}, 200, 'swing');
	handle = setTimeout(goNext, interval);
};

$('.pause').click(function() {
	clearTimeout(handle);
	// pause = false;
});

$('.reload').click(function() {
	reload();
});

$('.main').click(function() {
	goNext();
	if(fin)
		reload();
});




$(function() {
	$.getJSON('data.json', function(d) {
		for(var i = 0; i < d.length; i++) {  // 配列値渡し
			data_original[i] = d[i].concat();
			data[i] = d[i].concat();
		}
		$('.range')[1].value = d.length-1;
		$('.range')[1].max = d.length-1;
		data.sort( function() { return Math.random() - 0.5; } );
		// for(var i = 0; i < data.length; i++){
		// 	console.log(data[i]);
		// }
		// for(var i = 0; i < d.length; i++){
		// 	console.log(d[i]);
		// }
		init();
	});

});

// 0-n の整数の乱数
// function rand(n) {
// 	return Math.floor( Math.random()*n );
// }