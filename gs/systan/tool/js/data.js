// function Passage(jstate, jfrom, jto, estate, efrom, eto) {
// 	function Pass(state, from, to, lang) {
// 		this.state = state;
// 		this.from = from;
// 		this.to = to;
// 		this.lang = lang;
// 	}
// 	Pass.prototype.keystr = function() {
// 		var state = this.state;
// 		var s;
// 		// console.log(this);
// 		switch(this.lang) {
// 			case 'ja':
// 			s = [state.substring(0, this.from),
// 				 state.substring(this.from, this.to + 1),
// 				 state.substring(this.to + 1)];
// 			break;
// 			case 'en':
// 			sl = state.split(' ');
// 			s = ['','',''];
// 			for(var i = 0; i < this.from; i++) s[0] += sl[i] + ' ';
// 			for(var i = this.from; i < this.to + 1; i++) s[1] += sl[i] + ' ';
// 			for(var i = this.to + 1; i < sl.length; i++) s[2] += sl[i] + ' ';
// 				// console.log(s);
// 		}
// 		return s[0] + '<span class="keywords">' + s[1] + '</span>' + s[2];
// 	};
// 	this.ja = new Pass(jstate, jfrom, jto, 'ja');
// 	this.en = new Pass(estate, efrom, eto, 'en');
// }

// var data = [
// 	new Passage('彼女の助言に従う', 6, 7, 'follow her advice', 0, 0),
// 	new Passage('真剣にその問題を考える', 8, 10, 'consider the problem seriously', 0, 0),
// 	new Passage('20%増加する', 3, 6, 'increase by 20%', 0, 0),
// 	new Passage('君がすぐ来ることを予期する', 9, 12, 'expect you to arrive soon', 0, 0),
// 	new Passage('真実を語ることを決意する', 8, 11, 'decide to tell the truth', 0, 0),
// 	// {ques: {state: '20%増加する', from: 3, to: 6}, ans: {state: 'increase by 20%', from: 0, to: 0}},
// 	// {ques: {state: '君がすぐ来ることを予期する', from: 9, to: 12}, ans: {state: 'expect you to arrive soon', from: 0, to: 0}},
// ];
