const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const getChatPhotoUrl = require('./getChatPhotoUrl.js')
function unicodeToChar(text) {
    const normalizedText = text.normalize('NFKC');

    // Remove special Unicode characters
    const normalText = normalizedText.replace(/[\u200B-\u200D\uFEFF]/g, '');

    return normalText;
}

module.exports =  async (chatInfo, memberCount) => {
    try {
        chatInfo.title = unicodeToChar(chatInfo.title);

        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load a background image
        console.log("Loading background image...");
        const background = await loadImage('image/canva/background/group-background.jpg'); // Update this path
        console.log("Background image loaded.");

        // Draw the background image
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        // Add chat details with improved formatting
        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;


        // Add chat details
        ctx.fillText(chatInfo.title, 50, 70);
        ctx.font = '20px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;

        // Description
        ctx.font = '25px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;

        const description = chatInfo.description || 'N/A';
        const maxWidth = 550; // Maximum width for the description text box
        const lineHeight = 25; // Line height for each line of text
        const x = 50; // X-coordinate of the top-left corner of the text box
        let y = 130; // Y-coordinate of the top-left corner of the text box

        // Wrap text into lines that fit within the maxWidth
        const words = description.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);

        // Members
        ctx.fillText(`- Members: ${memberCount}`, 580, 70);

        // Get the group's profile photo URL
        const photoUrl = await getChatPhotoUrl(chatInfo);
        if (photoUrl) {
            const profilePhoto = await loadImage(photoUrl);
            // Draw rounded image
            const imageSize = 180; // Size of the rounded image
            let x = 580;
            let y = 100;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + imageSize / 2, y + imageSize / 2, imageSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(profilePhoto, x, y, imageSize, imageSize);
            ctx.restore();
        }

        // Save the image to a file
        console.log("Saving the image...");
        const buffer = canvas.toBuffer('image/png');
        const imagePath = 'group-info.png';
        fs.writeFileSync(imagePath, buffer);
        return imagePath;
    } catch (error) {
        console.log("Error in createGroupImage:", error);
    }
};