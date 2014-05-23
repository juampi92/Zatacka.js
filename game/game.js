var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

var GameCanvas = {
	el: document.getElementById('cavas'),
	ctx: null,
	init: function(w,h){
		if ( w != undefined ){
			this.el.width = w;
			this.el.height = h;
		} else {
			this.el.width = window.innerWidth;
			this.el.height = window.innerHeight;
		}

		this.ctx = this.el.getContext('2d');
	},
	reset: function(canv){
		this.el.width = this.el.width;
	}
};

var Game = {
	players: new Array(),
	state: 0, // 0: players , 1: playing


	init: function(){
		Game.states.menu();
		Menu.start();

	},
	states: {
		play: function(){
			Game.state = 1;
			rAF(gameloop);
			Menu.end();
			Play.init();
		},
		menu: function(){
			Game.state = 0;
			Menu.init();
		}
	},

};

var Play = {

};


function gameloop() {
	console.log("1");

    if ( Game.state == 1 ) rAF(gameloop);
};