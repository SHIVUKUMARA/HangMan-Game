// words
const words = [
  "html",
  "css",
  "javascript",
  "jquery",
  "bootstrap",
  "react",
  "angular",
  "vue",
  "nodejs",
  "express",
  "mongodb",
  "python",
  "java",
  "sql",
  "mysql",
  "github",
  "linkedin",
  "facebook",
  "twitter",
  "instagram",
  "whatsapp",
  "telegram",
  "kotlin",
  "flutter",
  "swift",
];

let wordele = document.getElementById("word");
let wrongele = document.getElementById("wrong-letters");
let num = document.getElementById("num");

let plyBtn = document.getElementById("playBtn");

let popup = document.getElementById("popup-box");
let notification = document.getElementById("notification");

let finalmsg = document.getElementById("final-msg");
let finalmsgWord = document.getElementById("final-msg-word");

// hangman shapes
let figparts = document.querySelectorAll(".figure-part");

let hintButton = document.getElementById("hint");
let hintCount = 0;

/* ------------- declare variables ------------- */

// seleted word
let selectedword = words[Math.floor(Math.random() * words.length)];
num.innerText = selectedword.length;

// play option
let playable = true;

// store the correct and wrong letters
let correctLetters = [];
let wrongLetters = [];

// display the word
function displayWord() {
  wordele.innerHTML = `${selectedword
    .split("")
    .map(
      (item) =>
        `<span class="letter">${
          correctLetters.includes(item) ? item : ""
        }</span> `
    )
    .join("")}`;

  let innerword = wordele.innerText.replace(/\n/g, "");
  if (innerword === selectedword) {
    finalmsg.innerText = "Congratulations! You won!...";
    finalmsgWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

displayWord();

// notification
function shownotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// wrong letters
function updatewrongletters() {
  wrongele.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((item) => `<span>${item}</span>`)}
    `;

  // display hangman body parts
  figparts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });

  //   if shape is completed
  if (wrongLetters.length === figparts.length) {
    finalmsg.innerText = "Oops! You lost!...";
    finalmsgWord.innerHTML = `The word was <u>${selectedword}</u>`;
    popup.style.display = "flex";
    playable = false;
  }
}

// play again button
plyBtn.addEventListener("click", () => {
  window.location.reload();
});

// input key handler
window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      if (selectedword.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          shownotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updatewrongletters();
        } else {
          shownotification();
        }
      }
    }
  }
});

// provide a hint by showing one letter
function showHint() {
  if (hintCount < 3) { 
    const unrevealedLetters = selectedword
      .split("")
      .filter((letter) => !correctLetters.includes(letter)); 

    if (unrevealedLetters.length > 0) {
      const randomHintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
      correctLetters.push(randomHintLetter); 
      displayWord();
      hintCount++;
    }
  } else {
    hintButton.style.display = "none";
    alert("You have already used all the hints.");
  }
}

// event listener for hint button
hintButton.addEventListener("click", showHint);
