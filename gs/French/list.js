var data = [
  ["8", "parents", "両親"],
  ["8", "enfant", "子供"],
  ["8", "fils", "息子"],
  ["8", "fille", "娘"],
  ["8", "frere", "兄弟"],
  ["8", "soueur", "姉妹"],
  ["8", "pere", "父"],
  ["8", "mere", "母"],
  ["8", "oncle", "おじ"],
  ["8", "tante", "おば"],
  ["8", "cousin", "従兄弟"],
  ["8", "cousine", "従姉妹"],
  ["9", "une tasse", "カップ"],
  ["9", "un verre", "グラス"],
  ["9", "une assiette", "皿"],
  ["9", "des baguettes", "バケット"],
  ["9", "une chaise", "いす"],
  ["9", "un canape", "ソファ"],
  ["9", "un tapis", "じゅうたん"],
  ["9", "un bureau", "デスク・事務室"],
  ["9", "une lampe", "ランプ"],
  ["9", "une bibliotheque", "本棚"],
  ["9", "des rideaux", "カーテン"],
  ["9", "lundi", "月曜"],
  ["10", "mardi", "火曜"],
  ["10", "mercredi", "水曜"],
  ["10", "judi", "木曜"],
  ["10", "vendredi", "金曜"],
  ["10", "samedi", "土曜"],
  ["10", "dimanche", "日曜"],
  ["10", "janvier", "１月"],
  ["10", "fevrier", "２月"],
  ["10", "mars", "３月"],
  ["10", "avril", "４月"],
  ["10", "mai", "５月"],
  ["10", "juin", "６月"],
  ["10", "juillet", "７月"],
  ["10", "aout", "８月"],
  ["10", "septembre", "９月"],
  ["10", "octobre", "１０月"],
  ["10", "novembre", "１１月"],
  ["10", "decembre", "１２月"],
  ["11", "Il fait beau.", "天気がいい"],
  ["11", "Il fait mauvais.", "天気が悪い"],
  ["11", "Il fait chaud.", "暑い"],
  ["11", "Il fait froid.", "寒い"],
  ["11", "Il pleut.", "雨が降っている"],
  ["11", "Il neige.", "雪が降っている"],
  ["11", "Le temps est nuageux.", "曇り"],
  ["11", "Il est une heure.", "１時"],
  ["11", "Il est trois heures et quart.", "３時１５分"],
  ["11", "Il est cinq heures et demie.", "５時半"],
  ["11", "Il est sept heures moins le quart.", "７時の１５分前"],
  ["11", "Il est midi.", "正午"],
  ["11", "Il est minuit.", "０時"],
  ["12", "jupe", "スカート"],
  ["12", "pantalon", "ズボン"],
  ["12", "robe", "ドレス"],
  ["12", "manteau", "コート"],
  ["12", "chemise", "ブラウス・カッター"],
  ["12", "cravate", "ネクタイ"],
  ["12", "veste", "ジャケット"],
  ["12", "chapeau", "帽子"],
  ["12", "pull", "セーター"],
  ["12", "rouge", "赤"],
  ["12", "bleu", "青"],
  ["12", "vert", "緑"],
  ["12", "noir", "黒"],
  ["12", "blanche", "白"],
  ["12", "jaune", "黄色"],
  ["12", "marron", "茶色"],
  ["12", "violet", "紫"],
  ["12", "orange", "オレンジ"],
  ["13", "en voiture", "車で"],
  ["13", "en train", "電車で"],
  ["13", "en avion", "飛行機で"],
  ["13", "en bateau", "船で"],
  ["13", "en bus", "バスで"],
  ["13", "en taxi", "タクシーで"],
  ["13", "a moto", "オートバイで"],
  ["13", "a bicyclette", "自転車で"],
  ["13", "a la campagne", "田舎に"],
  ["13", "a la montagne", "山に"],
  ["13", "a la mer", "海に"],
  ["13", "en ville", "街に"],
  ["14", "le printemps", "春"],
  ["14", "l'ete", "夏"],
  ["14", "l'automne", "秋"],
  ["14", "l'hiver", "冬"],
  ["14", "demain", "明日"],
  ["14", "apres-demain", "明後日"],
  ["14", "la semaine prochaine", "来週"],
  ["14", "le mois prochain", "来月"],
  ["14", "l'annee prochaine", "来年"],
  ["14", "dans trois ans", "３年後"],
  ["14", "un jour", "いつの日か"]
];


$(function() {

  init();

  $("#box > tr > td").click(function() {
    $(this).nextAll(".japone").toggle("fast");
  });

  $(".japone").click(function() {
    $(this).hide("fast");
  });

  $("#all").click(function() {
    $("#box > tr > td:nth-child(3)").toggle("fast");
  });

}());


function init() {
  for(var i = 0; i < data.length; i++) {
    $("#box")
      .append($("<tr>")
           .append($("<td>")
                   .text(data[i][0])
                   .css("width", "10%"))
           .append($("<td>")
                   .text(data[i][1])
                   .css("width", "45%"))
           .append($("<td>")
                   .text(data[i][2])
                   .addClass("japone")
                   .css("min-width", "45%")
                   .hide()));
  }
}
