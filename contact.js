let cursor = document.querySelector('#cursor');
let body = document.querySelector('body');

window.onload = () => {
  var audio = document.getElementById("myAudio");
  audio.play()
};


document.onmousemove = function(e) {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';

    body.style.backgroundPositionX = e.pageX / -4 + "px";
    body.style.backgroundPositionY = e.pageY / -4 + "px";
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = id => {
  const element = document.getElementById(id),
        text = element.innerText.split("");
  
  element.innerText = "";
  
  text.forEach((value, index) => {
    const outer = document.createElement("span");
    
    outer.className = "outer";
    
    const inner = document.createElement("span");
    
    inner.className = "inner";
    
    inner.style.animationDelay = `${rand(-5000, 0)}ms`;
    
    const letter = document.createElement("span");
    
    letter.className = "letter";
    
    letter.innerText = value;
    
    letter.style.animationDelay = `${index * 1000}ms`;
    
    inner.appendChild(letter);    
    
    outer.appendChild(inner);    
    
    element.appendChild(outer);
  });
}

enhance("channel-link");

console.log("Athithya")


function redirectToGame() {
  window.location.href="index.html"
}

const tryagain = document.getElementById('prev-page-btn')
tryagain.addEventListener("click", redirectToGame)