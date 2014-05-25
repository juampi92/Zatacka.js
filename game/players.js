function Player(){};
Player.prototype = {
	name: "",

	color: null,
	definedKeys: {l:0,r:0},
	
	posPunta: {x:0,y:0},
	angulo: null,

	setName: function(name) {
		this.name = name;
	},
	setTeclas: function(teclas){
		this.definedKeys.l = teclas[0];
		this.definedKeys.r = teclas[1];
	}

}
