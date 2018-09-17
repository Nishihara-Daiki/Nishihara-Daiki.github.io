var data = [
["parents","両親"],
["enfant","子供"],
["fils","息子"],
["fille","娘"],
["frere","兄弟"],
["soueur","姉妹"],
["pere","父"],
["mere","母"],
["oncle","おじ"],
["tante","おば"],
["cousin","従兄弟"],
["cousine","従姉妹"],
["une tasse","カップ"],
["un verre","グラス"],
["une assiette","皿"],
["des baguettes","バケット"],
["une chaise","いす"],
["un canape","ソファ"],
["un tapis","じゅうたん"],
["un bureau","デスク・事務室"],
["une lampe","ランプ"],
["une bibliotheque","本棚"],
["des rideaux","カーテン"],
["lundi","月曜"],
["mardi","火曜"],
["mercredi","水曜"],
["judi","木曜"],
["vendredi","金曜"],
["samedi","土曜"],
["dimanche","日曜"],
["janvier","１月"],
["fevrier","２月"],
["mars","３月"],
["avril","４月"],
["mai","５月"],
["juin","６月"],
["juillet","７月"],
["aout","８月"],
["septembre","９月"],
["octobre","１０月"],
["novembre","１１月"],
["decembre","１２月"],
["le printemps","春"],
["l'ete","夏"],
["l'automne","秋"],
["l'hiver","冬"],
["demain","明日"],
["apres-demain","明後日"],
["la semaine prochaine","来週"],
["le mois prochain","来月"],
["l'annee prochaine","来年"],
["dans trois ans","３年後"],
["un jour","いつの日か"],
["en voiture","車で"],
["en train","電車で"],
["en avion","飛行機で"],
["en bateau","船で"],
["en bus","バスで"],
["en taxi","タクシーで"],
["a moto","オートバイで"],
["a bicyclette","自転車で"],
["a la campagne","田舎に"],
["a la montagne","山に"],
["a la mer","海に"],
["en ville","街に"],
["jupe","スカート"],
["pantalon","ズボン"],
["robe","ドレス"],
["manteau","コート"],
["chemise","ブラウス・カッター"],
["cravate","ネクタイ"],
["veste","ジャケット"],
["chapeau","帽子"],
["pull","セーター"],
["rouge","赤"],
["bleu","青"],
["vert","緑"],
["noir","黒"],
["blanche","白"],
["jaune","黄色"],
["marron","茶色"],
["violet","紫"],
["orange","オレンジ"],
["Il fait beau.","天気がいい"],
["Il fait mauvais.","天気が悪い"],
["Il fait chaud.","暑い"],
["Il fait froid.","寒い"],
["Il pleut.","雨が降っている"],
["Il neige.","雪が降っている"],
["Le temps est nuageux.","曇り"],
["Il est une heure.","１時"],
["Il est trois heures et quart.","３時１５分"],
["Il est cinq heures et demie.","５時半"],
["Il est sept heures moins le quart.","７時の１５分前"],
["Il est midi.","正午"],
["Il est minuit.","０時"],
];
var num = 0;

function shuffle(array) {
	var n, tmp, i;
	for(n = array.length; n;) {
		i = (Math.random() * n--) >> 0;
		tmp = array[n];
		array[n] = array[i];
		array[i] = tmp;
	}
	return array;
}

$(function(){
	shuffle(data);
});

$(document).keypress(function(e) {
	if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
		next();
	}
});

$(document).click(next);

function next() {
	if(num >= data.length * 2) {
			$('#ques').text('Finish');
			num = 0;
			shuffle(data);
	}
	else {
		$('#ques').text(data[(num/2)>>0][num%2]);
		num++;
	}
	$('#num').text((((num+1)/2)>>0) + ' / ' + data.length);
}
