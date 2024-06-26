const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const getChatPhotoUrl = require('./getChatPhotoUrl.js');

function unicodeToChar(text) {
    // Normalize text to handle various Unicode characters including emojis
    const normalizedText = text.normalize('NFKC');
    return normalizedText;
}

module.exports = async (chatInfo, memberCount) => {
    try {
        // Ensure titles and descriptions are properly normalized
        chatInfo.title = unicodeToChar(chatInfo.title);
        chatInfo.description = chatInfo.description ? unicodeToChar(chatInfo.description) : 'N/A';

        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load background image
        console.log("Loading background image...");
        const background = await loadImage('image/canva/background/group-background.jpg'); // Update path as needed
        console.log("Background image loaded.");

        // Draw background image
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set common text styles
        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';

        // Title
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;
        ctx.fillText(chatInfo.title, 50, 70);

        // Description
        ctx.font = '25px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;

        const maxWidth = 550; // Maximum width for the description text box
        const lineHeight = 30; // Line height for each line of text
        let y = 130; // Y-coordinate of the top-left corner of the text box

        // Wrap text into lines that fit within the maxWidth
        const words = chatInfo.description.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, 50, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 50, y);

        // Members
        ctx.fillText(`- Members: ${memberCount}`, 580, 70);
        ctx.font = 'bold 28px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';

        // Profile photo
        const photoUrl = await getChatPhotoUrl(chatInfo);
        if (photoUrl) {
            const profilePhoto = await loadImage(photoUrl);
            const imageSize = 180; // Size of the rounded image
            let x = 580;
            y = 100;
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
