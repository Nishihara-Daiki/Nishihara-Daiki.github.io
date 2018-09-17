// 順次経過時刻を返す
var getPast = (function() {
  var lastDate = NaN;
  return function() {
    var now = Date.now();
    var past = now - lastDate;
    lastDate = now;
    return past;
  };
})();

// 配列要素シャッフル
function shuffle(array)
{
	var n, tmp, i;
	for(n = array.length; n; n) {
		i = (Math.random() * n--) >> 0;
		tmp = array[n];
		array[n] = array[i];
		array[i] = tmp;
	}
}


var quesheight = 50;	// 一行の高さ

var TM_NOTSTARTED = 0;
var TM_RUNNING = 1;
var TM_FINISH = 2;
var TM_FINISHED = 3;
var timerstatus = TM_NOTSTARTED; // タイマーのステータス

// 赤シート部の処理
function filtering() {
	var top = $("#scrollbox").scrollTop();
	var topnum = Math.floor(top / quesheight + 0.7) * 2 + 1;
	var lis = $("#scrollbox li");
	// console.log($lis);	
	for(var i = 1; i < topnum; i+=2)
		$(lis[i]).children(".keywords").removeClass("filter");
	for(var i = topnum; i < lis.length; i+=2)
		$(lis[i]).children(".keywords").addClass("filter");
	if(topnum >= lis.length + 1 && timerstatus == TM_RUNNING) {
		timerstatus = TM_FINISH;
	}
}

// cookieから範囲取得・書き込み
// 引数未定義なら読み込み
function rwRangeFtCookie(from, to) {
	var range;
	if(from == undefined || to == undefined) {  // 読み込み
		var cookiestr = document.cookie.split(';');
		var cookie = {};
		for (var i = cookiestr.length - 1; i >= 0; i--) {
			var kv = cookiestr[i].split('=');
			cookie[kv[0]] = kv[1];
		}
		if(cookie.range == undefined)	// cookieなければデフォルトセット
			range = '1_100';
		else
			range = cookie.range;
	}
	else {	// 書き込み
		range = '' + from + '_' + to;
	}
	document.cookie = 'range=' + range + '; max-age=2592000';

	return range;
}


function load() {
	var from = $("#from").val() - 0;
	var to = $("#to").val() - 0;
	if(from < 1) from = 1;
	if(to > data.length) to = data.length;
	$("#from").val(from);
	$("#to").val(to);
	rwRangeFtCookie(from, to);

	var number = [];	 // 出題順
	for(var i = 0; i <= to - from; i++)
		number[i] = i + from - 1;

	console.log(number);

	if($("#isRandom").prop("checked"))
		shuffle(number);

	$scrollbox = $("#scrollbox");
	$scrollbox.html("");
	for(var i = 0; i <= to - from; i++) {
		$scrollbox.append('<li title="' + (number[i]+1) + '">' + data[number[i]].en.keystr() + '</li>');
		$scrollbox.append('<li title="' + (number[i]+1) + '">' + data[number[i]].ja.keystr() + '</li>');
	}
	$("#scrollbox").scrollTop(0);
	filtering();
	timerstatus = TM_NOTSTARTED;
	$("#time").text('');
	$("#scrollbox li").on("click", function() {
		$(this).append(" " + $(this).attr("title"));
	});
}

$(function(){

	var range = rwRangeFtCookie().split('_');
	$("#from").val(range[0]);
	$("#to").val(range[1]);

	load();
	// $("#scrollbox").append('<li>').append('<li>');
	
	// $(document).bind('mousedown', function() {
	// 	var top = $('#scrollbox').scrollTop();
	// 	top = (Math.floor(top / quesheight / 2) + 1) * quesheight * 2;
	// 	// top = (Math.floor(top / quesheight) + 1) * quesheight;
	// 	// $('#scrollbox').scrollTop(top);
	// 	$('#scrollbox').animate({scrollTop:top}, 100, "swing");;
	// });

	// $("#scrollbox").scroll(filtering);
	$("#scrollbox").scroll(function() {
		// console.log(''+ isStarted + isFinished);
		if(timerstatus == TM_NOTSTARTED) {
			getPast();
			timerstatus = TM_RUNNING;
		}
		filtering();
		if(timerstatus == TM_FINISH) {
			var time = getPast();
			$("#time").text(Math.floor(time/100)/10 + "s");
			console.log(time);
			timerstatus = TM_FINISHED;
		}
	});

	$("#load").on("click", load);
});
