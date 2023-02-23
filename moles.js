let score = 0;

//Score

function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > 0.9;
}

//Intervals

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7"),
  },
];

//Moles properties

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "images/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "images/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.node.children[0].classList.add("hungry");
      if (mole.king) {
        mole.node.children[0].src = "images/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "images/mole-hungry.png";
      }
      mole.node.children[0].classList.remove("gone");
      break;
    case "hungry":
      mole.next = getSadInterval();
      mole.status = "sad";
      mole.node.children[0].classList.remove("hungry");
      if (mole.king) {
        mole.node.children[0].src = "images/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "images/mole-sad.png";
      }
      break;
  }
}

//Status change

function feed(event) {
  if (!event.target.classList.contains("hungry")) {
    return;
  }
  const mole = moles[parseInt(event.target.dataset.index)];
  mole.status = "fed";
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "images/king-mole-fed.png";
  } else {
    mole.node.children[0].src = "images/mole-fed.png";
  }
  mole.node.children[0].classList.remove("hungry");

  score++;

  if (score >= 10) {
    win();
  }
  document.querySelector(".worm-container").style.width = `${10 * score}%`;
}

function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}

//Manual status change when fed + win

let runAgainAt = Date.now() + 100;

function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

nextFrame();

//Moles status change - frames

document.querySelector(".bg").addEventListener("click", feed);

//How to recognize when feeding
