// We create our only state
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        // Load the image
        game.load.image("lazysloth","sloth.jpg");
        game.load.image(
            'leaf','leaf.jpg');
    }
    , create: function () {
        // This function is called after the 'preload' function 
        // Here we set up the game, display sprites, etc.
        this.keyboard= game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(300,300,"lazysloth");
        this.player.scale.setTo(.2,.2);
        
        //makes group of stuff
        this.leaf = game.add.group();
        this.leaf.enableBody = true;
        this.leaf.createMultiple(10,"leaf");
        
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        game.time.events.loop(220, this.addLeaf,this);
        // This contains Game Logic 
    },
    update: function () {
        this.player.body.velocity.x = 0;
        if (this.keyboard.right.isDown) {
            this.player.body.velocity.x = 300;
        }else if(this.keyboard.left.isDown) {
            this.player.body.velocity.x = -300;
        }
        
        
        if (this.keyboard.up.isDown){
            console.log("test");
            this.player.body.velocity.y = -300;
        }
    }
    , addLeaf: function(){
        var leaf = this.leaf.getFirstDead();
        if (!leaf) {
            return;
        }
        leaf.scale.setTo(.2,.2);
        leaf.anchor.setTo(0.5, 1);
        leaf.reset( game.rnd.pick([game.width/2,0]),0);
        leaf.body.gravity.y = 500;
        leaf.body.velocity.x = 100 *
        game.rnd.pick([-2, 2]);
        leaf.body.bounce.x = 1;
        leaf.checkWorldBounds = true;
        leaf.outOfBoundsKill = true;
    }
    
    // Initialize the lea
};
// We initialize Phaser
var game = new Phaser.Game(800, 800, Phaser.AUTO, '');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');