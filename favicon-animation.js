window.addEventListener('DOMContentLoaded', () => {
    const favicon = document.getElementById('animated-favicon');
    if (!favicon) return;

    // We change the source to a true GIF file so the browser image element 
    // decodes internal frames correctly in the background memory
    const img = new Image();
    img.src = favicon.href;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
        function playLoop() {
            ctx.clearRect(0, 0, 32, 32);
            
            // Draw image context state
            ctx.drawImage(img, 0, 0, 32, 32);
            
            // Force replace string
            favicon.href = canvas.toDataURL('image/png');
            
            // Keeps it throttled around ~30fps so the browser tab doesn't crash
            setTimeout(playLoop, 33); 
        }
        playLoop();
    };
});
