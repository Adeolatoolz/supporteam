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

const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const rollButton = document.getElementById("roll-button");

let rollCount = 0;

rollButton.addEventListener("click", () => {
    if (rollCount < 3) {
        const randomDegree = Math.floor(Math.random() * 360);
        wheel.style.transition = "transform 3s ease-out";
        wheel.style.transform = `rotate(${randomDegree + 1080}deg)`;
        const segmentIndex = Math.floor((360 - (randomDegree % 360)) / (360 / prices.length));
        setTimeout(() => {
            const prize = prices[segmentIndex];
            if (rollCount < 2 && prize === "$ Empty") {
                result.innerText = `Try again! You have ${2 - rollCount} rolls left.`;
            } else if (rollCount === 2 && prize !== "$ Empty") {
                result.innerText = `Congratulations! You won ${prize}. Fee: ${fees[prize] || "N/A"}`;
            }
            rollCount++;
        }, 3000);
    } else {
        result.innerText = "You have used all your rolls!";
    }
});
