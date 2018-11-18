// Enemies our player must avoid
var Enemy = function(xPosition,yPosition) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // We setup the initial x,y position
    this.x = xPosition;
    this.y = yPosition;
    // Setup of the initial speed randomly
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x <= 550){
      this.x += this.speed * dt;
    }else{
      this.x = -2;
    }
    // handling the collision
    if (player.x >= this.x - 30
      && player.x <= this.x + 30
      && player.y >= this.y - 30
      && player.y <= this.y + 30) {
        //restarting player position if has collide
        player.reset();
      }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player creation
const Player = function(xPosition,yPosition) {
    this.sprite = 'images/char-boy.png';

    // We setup the initial x,y
    this.x = xPosition;
    this.y = yPosition;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

 // I didn't need the update function yet. as the handleInput is enough.
};

// Draw the enemy on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// We handle every key the user presses to move the player around
Player.prototype.handleInput = function(keyPressed) {
  //Possible values are: "up","down","right","left"
  switch (keyPressed){
    case "up":
      if (this.y == 0){
        // When you're in the water and crosses, is game done
        player.reset('Won');
      } else {
        this.y -= 100;
      }
      break;
    case "down":
      if (this.y >= 400){
        // We do nothing here
      } else {
        this.y += 100;
      }
    break;

    case "right":
      if (this.x >= 400){
        // We do nothing here
      } else {
        this.x += 100;
      }
      break;

    case "left":
    if (this.x <= 0){
      // We do nothing here
    } else {
      this.x -= 100;
    }
    break;

    default:

  }

};
// Instantiating the player and enemies.
const player = new Player(200,400);

var allEnemies = [];

(function addEnemies () {
  allEnemies.push(new Enemy(-2, 0));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2,200));
  allEnemies.push(new Enemy(-2,300));
}());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
// reset function which is linked to Object because is used by any entity
// When we collide, then, just plain reset of the player, but if we win, a modal
// is shown
Object.prototype.reset = function(reason){
  this.x = 200;
  this.y = 400;
  // if we have won...
  if (reason == "Won"){
    // Modal to be shown when the game ends

    if (document.getElementById('paragraph-modal')){
      if (document.getElementById("paragraph-modal").innerHTML !== " " )
      {
      document.getElementById("paragraph-modal").innerHTML= "";
      }
    }
    let modal = document.getElementById('demo-modal');


    modal.showModal();
    /* Creation of the paragraph to show data*/
    let modalBody = document.getElementsByClassName("modal-body");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "paragraph-modal");
    paragraph.innerHTML = `You made it!`;

    modalBody[0].appendChild(paragraph);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        paragraph.innerHTML = "";
        modal.close('cancelled');
      }
    });
  }
};
