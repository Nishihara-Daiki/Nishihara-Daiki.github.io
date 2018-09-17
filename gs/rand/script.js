$('#start').click(function(){
	var s = +$('#s').val();
	var m = +$('#m').val();
	var e = +$('#e').val();
	s = s ? s : 0;
	m = m ? m : 0;
	e = e ? e : 0;
	m = s < m ? m : s;
	e = m < e ? e : m + 1;
	$('#s').val(s);
	$('#m').val(m);
	$('#e').val(e);
	for(var i = 0; i < rand(25, 35); i++)
		setTimeout((function(){
			return function(){result(s, m, e)};
		})(s, m, e), i * i *2);
});

function rand(min, max) {
	return (Math.floor( Math.random() * (max + 1 - min) ) + min);
}

// 偶数しか出さない
function erand(min, max) {
	var r;
	for(; (r = rand(min, max)) % 2; );
	return r;
}

function result(s, m, e) {
	var systan = $('#systan');
	var nextstage = $('#nextstage');
	var simple = $('#simple');
	var str;
	var r = erand(s, e);
	str = r;
	if(s <= r && r <= m)
		str += ', ' + erand(m+1, e);
	str += '<br>';
	nextstage.html(str);

	systan.html(rand(s, m) + ', ' + rand(m+1, e) + '<br>');
	simple.html(rand(s, e));
}

