var current = {
	'storage': getLocalStorage(),
	'__preview': "",
	'__classindex': 0,	// クラス番号
	'__order': 0,		// 滑走順
	get players() {
		return this.class[this.__classindex].players;
	},
	get class() {
		return this.storage.class;
	},
	get ranking_table() {	// ランキングテーブルを返す
		var ranking = [];
		var rank = [];
		for(let [i,player] of this.players.entries()) {
			ranking[i] = [i, get_total_segment_score(player)];
		}
		ranking.sort(function(a,b){return b[1]-a[1]});
		var tmp = [];
		for(let [i,r] of ranking.entries()) {
			// rank[i] = r[1] === "" ? "" : r[1] === tmp ? rank[i-1] : r[0];
			rank[r[0]] = r[1] === "" ? "" : r[1] === tmp[1] ? tmp[0] : "" + (i + 1);
			tmp = [rank[r[0]], r[1]];
		}
		return rank;
	},
	get order() { return this.__order; },
	set class_name(class_name) {
		var s = this;
		var index = +Object.keys(this.class).filter( (key) => { // valueからkeyを得る
			return this.class[key].class_name === class_name;
		})[0];
		this.__classindex = index;
	},
	set order(order) {
		this.__order = order;
	},
	set score(order_es_pcs_deduction_list) {
		var [order,es,pcs,deduction] = order_es_pcs_deduction_list;
		this.players[order][2] = es;
		this.players[order][3] = pcs;
		this.players[order][4] = deduction;
	},
	set preview(obj) { this.__preview = obj; },
	get preview() { return this.__preview },
	// set display(display) {

	// }
}

$(function() {

	window.addEventListener('storage', function(e) {
		update();
	}, false);

	// クラス変更したら
	$('#class_name').change(function() {
		var classname = $('#class_name option:selected').text();
		current.class_name = classname;
		create_player_list();
	});

	$('#switch-buttons button').click(function() {
		var content = get_display_obj($(this).val());
		current.preview = content;
		url = "display.html?scorebord_data=" + encodeURI(JSON.stringify(current.preview));
		$('#preview-iframe').attr("src", url);
		// console.log(current.preview);
	});

	$('#submit-button button').click(function() {
		var storage = current.storage;
		storage.display = current.preview;
		setLocalStorage(storage);
	});

	update();
	create_player_list();
});


// ストレージ内容に合わせて表示内容更新
function update() {

	// select -> option
	var cls = current.class;
	$("#class_name").html("");
	for(i = 0; i < cls.length; i++)
		$("#class_name").append("<option>" + cls[i].class_name + "</option>");
}

// 選手一覧作成
function create_player_list() {
	var $table = $("#playerlist table.tbody");
	$table.html("");

	for(let [i, player] of current.players.entries()) {
		let es = "", pcs = "", deduction = "", tss = "", rank = "";
		if(player.length >= 3 && player[2] != "") {
			es = +player[2];
			pcs = +player[3];
			deduction = +player[4];
			tss = calc_total_segment_score(es, pcs, deduction);
			rank = 0;
		}
		let s = '<tr>';
		s += '<td>' + (i+1) + '</td>';
		s += '<td>' + player[0] + '</td>';
		s += '<td>' + player[1] + '</td>';
		s += '<td><input value="' + es + '"></td>';
		s += '<td><input value="' + pcs + '"></td>';
		s += '<td><input value="' + deduction + '"></td>';
		s += '<td>' + tss + '</td>';
		s += '<td>' + rank + '</td>';
		s += '</tr>';
		$table.append(s);
	}

	$('#playerlist .tbody input').change(function() {
		var $trs = $('#playerlist .tbody tr')
		var order = $trs.index($(this).closest("tr"));
		var $tr = $trs.eq(order);
		var $inputs = $tr.find("input");
		var es = $inputs.eq(0).val();
		var pcs = $inputs.eq(1).val();
		var deduction = $inputs.eq(2).val();
		current.score = [order,es,pcs,deduction];
		var tss = calc_total_segment_score(es, pcs, deduction);
		update_score(order, tss);
	});

	$('#playerlist .tbody tr td:not(:nth-child(n+4):nth-child(-n+6))').click(function() {
		var $trs = $('#playerlist .tbody tr');
		var $thisparent = $(this).parent();
		var index = $trs.index($thisparent);
		$trs.removeClass("selected");
		$thisparent.addClass("selected");
		current.order = index;
	});
	reranking();
}


function calc_total_segment_score(es, pcs, deduction) {
	if(es !== "" && pcs !== "" && deduction !== "")
		return Math.abs(+es)+Math.abs(+pcs)-Math.abs(+deduction);
	else 
		return "";
}


function get_total_segment_score(player) {
	if(player.length >= 5)
		return calc_total_segment_score(player[2], player[3], player[4]);
	else
		return "";
}


// スコア更新
function update_score(order, tss) {
	var $trs = $('#playerlist .tbody tr');
	var $tr = $trs.eq(order);
	$tr.find("td").eq(6).text(tss);
	reranking();
}


// ランキングして更新
function reranking() {
	// for(let [i,r] of current.ranking_table.entries()) {
	// 	if(r !== "") {
	// 		$('#playerlist .tbody tr').eq(r).find('td').eq(7).text(i+1);
	// 	}
	// }
	$trs = $('#playerlist .tbody tr');
	for(let i = 0; i < $trs.length; i++) {
		$trs.eq(i).find('td').eq(7).text(current.ranking_table[i])
	}
}


function get_display_obj(displaystr) {
	var obj = {};
	var order = current.order;
	var player = current.players[order];
	// var ranking_table = +current.ranking_table-1;

	switch(displaystr) {
	case "order":
		obj = {
			"number": "" + (order + 1),
			"name": player[0],
			"assign": player[1]
		};
		break;
	case "score":
		obj = {
			"number": "" + (order + 1),
			"name": player[0],
			"assign": player[1],
			"es": player[2],
			"pcs": player[3],
			"deductions": player[4],
			"tss": "" + get_total_segment_score(player),
			"rank": current.ranking_table[order]
		};
		break;
	case "rank":
		// for(let i = 0; i < 8 && i < current.players.length; i++) {
		// 	if(current.ranking_table[i] == "")
		// 		break;
		// 	let rn = "r" + i, namen = "name" + i, scoren = "score" + i;
		// 	let p = current.players[+current.ranking_table[i]-1];
		// 	console.log(p.length);
		// 	obj[rn] = "" + i;
		// 	obj[namen] = current.players[current.ranking_table[i]-1][0]; //p[0];
		// 	obj[scoren] = get_total_segment_score(p);
		// }
		// break;


		for(let i = 0; i < current.ranking_table.length; i++) {
			let rank = +current.ranking_table[i];
			if(rank == 0)
				break;
			if(rank > 8)
				continue;
			let rn = "r" + rank, namen = "name" + rank, scoren = "score" + rank;
			obj[rn] = "" + rank;
			obj[namen] = current.players[i][0];
			obj[scoren] = get_total_segment_score(current.players[i]);
		}
		break;
	case "message":
		obj = {"text": $("#message-text").val().replace(/\n/g, "<br>")};
		break;
	}
	var content = {
		"scene": displaystr,
		"content": obj
	}
	console.log(obj);
	return content;
}


		// "content": {
		// 	"r1": "1", "name1": "羽生 結弦", "score1": "214.96",
		// 	"r2": "2", "name2": "宇野 昌磨", "score2": "200.43",
		// 	"r3": "3", "name3": "パトリック チャン", "score3": "175.29",
		// 	"r4": "4", "name4": "高橋 大輔", "score4": "150.44",
		// 	"r5": "5", "name5": "中浦 哲志", "score5": "50.43",
		// 	"r6": "6", "name6": "屋金 崚太", "score6": "17.98",
		// 	"r7": "7", "name7": "山田 太郎", "score7": "12.29",
		// 	"r8": "8", "name8": "麻生 太郎", "score8": "4.33"
		// }