var Menu = {
	els: {
		nom:document.getElementById("playerName"),
		button:document.getElementById("addp"),
		menu:document.getElementById("menu"),
		ul:document.getElementById("players")
	},
	start: function() {
		var ocupado = false;
		Menu.els.button.onclick = function(){
			if (ocupado) return;
			ocupado = true;
			var newPlayer = new Player();
			newPlayer.setName(Menu.els.nom.value);
			var li = document.createElement("li");
			Menu.detectarTeclas.init( function(teclas) {
				newPlayer.setTeclas(teclas);
				ocupado = false;
				players.push(newPlayer);
				li.style.color = Menu.elejirColor.index(2);
				li.appendChild(document.createTextNode(Menu.els.nom.value));				
			});
			Menu.els.ul.appendChild(li);
			
		}
	},

	init: function() {
		Menu.els.ul.style.display = "block";
	},

	end: function() {
		Menu.els.ul.style.display = "none";
	},
	detectarTeclas: {
		callback: null,
		teclas: [],
		init: function(callback) {
			Menu.detectarTeclas.teclas = [];
			Menu.detectarTeclas.callback = callback;
			window.onkeyup = Menu.detectarTeclas.keyup;
		},
		keyup: function(e) {
			Menu.detectarTeclas.teclas.push(e.which);
			if (Menu.detectarTeclas.teclas.length > 1)
				Menu.detectarTeclas.end();
		},
		end: function() {
			Menu.detectarTeclas.callback(Menu.detectarTeclas.teclas);
			window.onkeyup = null;
		}
	},
	elejirColor: {
		names: {
		 	"0": "#ffd700",
		 	"1": "#800080",
		 	"2": "#a9a9a9",
		 	"3": "#ff00ff"
		    /*aqua: "#00ffff",
		    azure: "#f0ffff",
		    beige: "#f5f5dc",
		    blue: "#0000ff",
		    brown: "#a52a2a",
		    cyan: "#00ffff",
		    darkblue: "#00008b",
		    darkcyan: "#008b8b",
		    darkgrey: "#a9a9a9",
		    darkgreen: "#006400",
		    darkkhaki: "#bdb76b",
		    darkmagenta: "#8b008b",
		    darkolivegreen: "#556b2f",
		    darkorange: "#ff8c00",
		    darkorchid: "#9932cc",
		    darkred: "#8b0000",
		    darksalmon: "#e9967a",
		    darkviolet: "#9400d3",
		    fuchsia: "#ff00ff",
		    gold: "#ffd700",
		    green: "#008000",
		    indigo: "#4b0082",
		    khaki: "#f0e68c",
		    lightblue: "#add8e6",
		    lightcyan: "#e0ffff",
		    lightgreen: "#90ee90",
		    lightgrey: "#d3d3d3",
		    lightpink: "#ffb6c1",
		    lightyellow: "#ffffe0",
		    lime: "#00ff00",
		    magenta: "#ff00ff",
		    maroon: "#800000",
		    navy: "#000080",
		    olive: "#808000",
		    orange: "#ffa500",
		    pink: "#ffc0cb",
		    purple: "#800080",
		    violet: "#800080",
		    red: "#ff0000",
		    silver: "#c0c0c0",
		    white: "#ffffff",
		    yellow: "#ffff00"*/
		},
		random: function() {
		    var result;
		    var count = 0;
		    for (var prop in Menu.elejirColor.names)
		        if (Math.random() < 1/++count)
		           result = prop;
		    return result;
		},
		index: function(index) {
			
			return Menu.elejirColor.names[index];

		}
	}
}
var players = new Array();
Menu.start();


