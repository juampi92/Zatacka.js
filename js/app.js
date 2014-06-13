(function(){
  var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

  var InputManager = {
    keys: [],
    init: function(){
      this.keys = [];
      window.onkeydown = this.keydown;
      window.onkeyup = this.keyup;
    },
    keydown: function(e){
      InputManager.keys[e.which] = true;
    },
    keyup: function(e){
      InputManager.keys[e.which] = false;
    },
    isKey: function(key){
      return this.keys[key];
    }
  };

  var GameCanvas = {
    el: null,
    ctx: null,
    init: function(){
      this.el = document.getElementById('canvas');      
      this.el.width = window.innerWidth - 6;
      this.el.height = window.innerHeight - 6;
      
      this.ctx = this.el.getContext('2d');
    },
    reset: function(){
      this.el.width = this.el.width;
    }
  };

  var Game = {
    players: [],
    state: null,
    start: function(){
      GameCanvas.init();
      InputManager.init();
      GameStage.init();

      this.addPlayer(new Player({color:'red',keys:{l:37,r:39}}));

      this.setState(Play);

      gameloop();

    },
    setState: function(state){
      this.state = state;
      this.state.start();
    },
    update: function(){
      this.state.update();
    },
    restart: function(){
      this.players = [];
    },
    addPlayer: function(plyr){
      this.players.push(plyr);
    }

  };

  var Menu = {
    update: function(){
      console.log("Updating");
    }
  };

  var Play = {
    start: function(){
      GameCanvas.reset();
      GameStage.borders();
      // Draw sides
      // Create stage
      // 
      Game.players[0].start({x:10,y:10},0);
    },
    update: function(){
      for (var i = 0; i < Game.players.length; i++) {
        Game.players[i].update();
      }
    }
  };

  var GameStage = {
    init: function(){
      this.x = 10;
      this.y = 10;
      this.w = GameCanvas.el.width - 60;
      this.h = GameCanvas.el.height - 20;
    },
    borders: function(){
      var ctx = GameCanvas.ctx;
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.x,this.h);
      ctx.lineTo(this.w,this.h);
      ctx.lineTo(this.w,this.y);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
    },
    reset: function(){
      //
    },
    draw: function(coords,color){
      var ctx = GameCanvas.ctx;
      ctx.beginPath();
      ctx.moveTo(this.x + coords.x-1, this.y + coords.y);
      ctx.lineTo(this.x + coords.x, this.y + coords.y+1);
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  };

  function Player(opts){
    this.keys = opts.keys || {l:null,r:null};
    this.color = opts.color || null;

    this.pos = {x:0,y:0};
    this.angle = 0;
    this.score = 0;
    this.kills = 0;
    this.state = 0;
  };
  Player.turnSpeed = Math.PI / 18;
  Player.prototype.start = function(pos,angle){
    this.pos = pos;
    this.angle = angle * Math.PI / 180;
    GameStage.draw(this.pos,this.color);
  };
  Player.prototype.update = function() {
    // Calcular siguiente posiion
    if ( InputManager.isKey(this.keys.l) ) {
      this.angle += Player.turnSpeed;
    } else if ( InputManager.isKey(this.keys.r)) {
      this.angle -= Player.turnSpeed;
    }

    this.pos.x += Math.sin(this.angle) *2;
    this.pos.y += Math.cos(this.angle) *2;


    // Revisar colision?
    
    // Dibujar
    GameStage.draw(this.pos,this.color);
  };
  Player.prototype.collision = function(canvas) {
    canvas.getPos(this.pos);
  };

  var last = Date.now(),
    diff = 0;

  function gameloop() {

    rAF(gameloop);

    diff += (Date.now()) - last;
    last = Date.now();
    if ( diff < 20  ) return;
    diff = 0;

    //
    Game.update();

  };


  // Start game
  Game.start();

})();
