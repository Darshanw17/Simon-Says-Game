// Arrays to store the game's and user's sequence
let gameSeq = [];
let userSeq = [];

// Available button colors
let btns = ["yellow", "red", "green", "purple"];

// Game control variables
let started = false;
let level = 0;

// Selecting the <h2> element to update game messages
let h2 = document.querySelector('h2');

// Start the game when any key is pressed
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// Function to flash a button for visual effect
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Function to go to the next level
function levelUp() {
    userSeq = []; // Reset the user's sequence
    level++; // Increase level count
    h2.innerText = `Level ${level}`; // Update heading

    let randomIdx = Math.floor(Math.random() * 4); // Fixed bug: should be 4 not 3
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor); // Add random color to the game's sequence
    console.log("Game Sequence:", gameSeq);

    btnFlash(randombtn); // Show the color to the user
}

// Function to handle button click by the user
function btnPress() {
    let btn = this;
    btnFlash(btn); // Flash the clicked button

    let userColor = btn.getAttribute("id"); // Get color id from button
    userSeq.push(userColor); // Add to user’s sequence
    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1); // Check the latest move
}

// Function to compare user’s input with the game’s sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If the current move is correct
        if (userSeq.length === gameSeq.length) {
            // If the user completed the full level correctly
            setTimeout(levelUp, 1000); // Move to next level after 1 second
        }
    } else {
        // Wrong move — Game Over
        h2.innerHTML = `Game Over! <b>Your Score was ${level}</b> <br> Press any key to try again`;
        reset(); // Reset the game
    }
}

// Add click event listener to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
