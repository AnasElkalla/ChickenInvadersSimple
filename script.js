const container = document.querySelector(".container");
const spaceshipBox = document.querySelector(".spaceship");
const game = document.querySelector(".game");
const lives = document.querySelector("span");
const message = document.querySelector("header");
const score = document.querySelector("h3");
let scoring = 0;
let chickenRoll = Math.ceil(Math.random() * 50);
for (let i = 0; i < chickenRoll; i++) {
  const div = document.createElement("div");
  container.appendChild(div);
  div.style.cssText = ("display: inline-block", "width:5vw", "height:5vw");
  const chicken = document.createElement("img");
  const chicks = ["chicken (1).png", "hen (1).png", "hen.png"];
  let chicksROll = Math.floor(Math.random() * 3);
  chicken.src = chicks[chicksROll];
  chicken.style.cssText = ("display: inline-block", "width:5vw", "height:5vw");
  chicken.classList.add("chicken");
  div.appendChild(chicken);
}
const divs = document.querySelectorAll("div");
const chickenNumber = document.querySelectorAll(".chicken");

let increment = 1;

function moveChicken() {
  const containerPosition = container.getBoundingClientRect();
  let position = containerPosition.left;
  if (position > 500) {
    increment = -increment;
  } else if (position < 0) {
    increment = -increment;
  }
  container.style.left = `${position + increment}px`;
}
let lifes = 3;
let losinglife = false;
let explosion = new Audio("explosion.mp3");

function egg() {
  let eggRoll = Math.ceil(Math.random() * 1);
  for (let i = 0; i < eggRoll; i++) {
    const egg = document.createElement("img");
    egg.src = "egg (1).png";
    egg.classList.add("egg");
    game.appendChild(egg);
    let eggstarter =
      divs[Math.ceil(Math.random() * chickenRoll)].getBoundingClientRect();
    const eggDrop = document.querySelectorAll(".egg");
    let eggY = 1;
    const eggPosition = eggDrop[i].getBoundingClientRect();
    eggDrop[i].style.left = `${eggstarter.left}px`;
    eggDrop[i].style.top = `${eggstarter.top}px`;
    function moveEgg() {
      let eggPosition2 = eggDrop[i].getBoundingClientRect();
      eggY++;
      eggDrop[i].style.top = `${eggstarter.top + eggY}px`;
      if (eggPosition2.top > 620) {
        eggDrop[i].src = "fried-egg (1).png";
        eggDrop[i].style.top = `620px`;
        eggDrop[i].style.transition = "1s ease";
      }
      spaceshipPosition = spaceship.getBoundingClientRect();
      console.log(spaceshipPosition.x, eggPosition2.x);
      if (
        spaceshipPosition.x - eggPosition2.x < 10 &&
        spaceshipPosition.x - eggPosition2.x > -10 &&
        eggPosition2.top > 600
      ) {
        function losing() {
          console.log("loser");
          spaceship.src = "explosion.png";
          losinglife = true;
        }
        losing();
      }
    }
    setInterval(moveEgg, 2);

    function removeEgg() {
      eggDrop[i].remove();
      if (losinglife && lifes > 0) {
        explosion.play();
        lifes--;
        lives.textContent = `${lifes}`;
        spaceship.src = "spaceship.png";
        losinglife = false;
      } else if(lifes===0){
        message.textContent = "GAME OVER";
      }
    }
    setTimeout(removeEgg, 5000);
  }
  return eggDrop[i].style.left;
}
setInterval(egg, 6000);
setInterval(moveChicken, 10);

document.addEventListener("mousemove", function (e) {
  spaceshipBox.style.left = `${e.x}px`;
});
function newBullet() {
  let bulletSound = new Audio("bullet.mp3");
  bulletSound.play();
  let spaceshipPosition = spaceshipBox.getBoundingClientRect();

  const bullet = document.createElement("img");
  bullet.src = "bullet.png";
  bullet.classList.add("bullet");
  game.appendChild(bullet);
  moveY = 550;
  bullet.style.top = "600px";
  bullet.style.left = `${spaceshipPosition.left}px`;

  function bulletmove() {
    bullet.style.top = `${(moveY -= 1)}px`;
    for (let i = 0; i < chickenRoll; i++) {
      let bulletPosition = bullet.getBoundingClientRect();
      let chickenPosition = divs[i].getBoundingClientRect();
      console.log(bulletPosition.x, chickenPosition.x);
      const fired = divs[i];
      if (
        bulletPosition.x - chickenPosition.x <= 20 &&
        bulletPosition.x - chickenPosition.x >= -20 &&
        bulletPosition.y - chickenPosition.y <= 20 &&
        bulletPosition.y - chickenPosition.y >= -20
      ) {
        bullet.remove();
        chickenNumber[i].style.visibility="hidden";
        scoring++;
        score.textContent = `SCORE ${scoring}`;
      }
    }
    if (moveY < 50) {
      bullet.remove();
    }
  }
  setInterval(bulletmove, 2);
}
document.addEventListener("click", newBullet);
