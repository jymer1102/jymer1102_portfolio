window.addEventListener('DOMContentLoaded', () => {
    const favicon = document.getElementById('animated-favicon');
    if (!favicon) return;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Set to your exact count of 94 frames
    const totalFrames = 94; 
    let currentFrame = 1;
    const loadedImages = [];
    let imagesLoadedCount = 0;

    // Preload all 94 frames so the sequence runs seamlessly
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // Pointing to your extracted .gif frame files
        img.src = `/images/favicon/frames/j_${i}.gif`; 
        
        img.onload = () => {
            imagesLoadedCount++;
            if (imagesLoadedCount === totalFrames) {
                // All 94 frames are ready in memory—start looping!
                startSequence();
            }
        };
        loadedImages.push(img);
    }

    function startSequence() {
        function play() {
            ctx.clearRect(0, 0, 32, 32);
            
            // Draw current frame onto canvas
            ctx.drawImage(loadedImages[currentFrame - 1], 0, 0, 32, 32);
            
            // Force the updated canvas frame to the browser tab
            favicon.href = canvas.toDataURL('image/png');
            
            // Move to the next frame (loops back to 1 after frame 94)
            currentFrame = (currentFrame % totalFrames) + 1;
            
            // ~30 frames per second speed
            setTimeout(play, 33); 
        }
        play();
    }
});
