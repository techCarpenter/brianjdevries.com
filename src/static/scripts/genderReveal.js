const BOY_COLOR = "#89cff0";
const GIRL_COLOR = "#f8b9d4";
const drumrollSound = "/media/drum-roll.mp3"
const tadaSound = "/media/tada.mp3"
const hogwartsMarchSound = "/media/hogwarts-march.mp3"
// @ts-ignore
const JS_CONFETTI = new JSConfetti();
const GENDER_ENUM = {
  BOY: '62',
  GIRL: '67'
};
const genderId = (new URLSearchParams(window.location.search)).get('id');
if (genderId === null || (genderId !== GENDER_ENUM.BOY && genderId !== GENDER_ENUM.GIRL)) {
  let section = /** @type {HTMLElement} */ (document.querySelector("section"));
  section.textContent = "No Gender Specified";
  whiteBackground();

  throw new Error("no gender selected");
}
const gender = genderId === GENDER_ENUM.BOY
  ? GENDER_ENUM.BOY
  : GENDER_ENUM.GIRL
const BOY_CONFETTI = [
  "#45b3e7",
  "#5cbdea",
  "#72c6ed",
  "#89cff0",
  "#a0d8f3",
  "#b6e1f6",
  "#cdebf9"
];
const GIRL_CONFETTI = [
  "#f173a9",
  "#f38bb8",
  "#f6a2c6",
  "#f8b9d4",
  "#fad0e2",
  "#fde7f0",
  "#ffffff"
];
const CONFETTI = gender === GENDER_ENUM.BOY
  ? BOY_CONFETTI
  : GIRL_CONFETTI;

/** @type {HTMLButtonElement} */ (document.querySelector("#reveal-gender")).onclick = revealGender;

function throwConfetti() {
  JS_CONFETTI.addConfetti({ confettiColors: CONFETTI });
}
function startConfetti() {
  throwConfetti();
  var confettiInverval = setInterval(throwConfetti, 2500);
}
function whiteBackground() {
  document.querySelector("body")
    ?.classList
    .add('white-background');
}

function revealGender() {
  // Clear section tag
  let section = /** @type {HTMLElement} */ (document.querySelector("section"));
  let root = /** @type {HTMLElement} */ (document.querySelector(":root"));
  let audio = new Audio();

  window.onblur = function () {
    audio.muted = true;
  }
  window.onfocus = function () {
    audio.muted = false;
  }

  root?.style?.setProperty("--baby-color", gender === GENDER_ENUM.BOY ? BOY_COLOR : GIRL_COLOR);

  // Change document background
  whiteBackground();

  section.innerHTML = "<img src='https://media.tenor.com/QC7e6PuyMb4AAAAd/chris-pratt-andy-dwyer.gif'/>";
  window.scrollTo(0, 0);

  audio.src = drumrollSound;
  audio.volume = 0.2;
  audio.play();

  setTimeout(function () {
    audio.src = tadaSound;
    audio.play();
    startConfetti();

    section.innerHTML = `<h1 class="reveal">IT'S A ${gender === GENDER_ENUM.BOY ? "BOY" : "GIRL"}!</h1>`;
    section.classList.add("reveal");

    setTimeout(function () {
      audio.src = hogwartsMarchSound;
      audio.volume = 1;
      audio.play();
    }, 2000);
  }, 6000);
}

