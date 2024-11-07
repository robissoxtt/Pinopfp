const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const token = '7651630716:AAENTJUzLg7WS9wTQhPI33g-lEI--vJ-3Y4'; // Replace with your bot's token
const bot = new TelegramBot(token, { polling: true });

// Listen for data from the Mini App
bot.on('message', async (msg) => {
    if (msg.web_app_data) {  // Check if data is from the Web App
        const chatId = msg.chat.id;
        const base64Data = msg.web_app_data.data;

        // Convert base64 data to a buffer
        const buffer = Buffer.from(base64Data, 'base64');

        // Save the buffer as an image file
        const imagePath = 'avatar.png';
        fs.writeFileSync(imagePath, buffer);

        // Send the image back to the user
        bot.sendPhoto(chatId, imagePath)
            .then(() => {
                fs.unlinkSync(imagePath); // Delete file after sending
            })
            .catch((err) => console.error('Error sending photo:', err));
    }
});
