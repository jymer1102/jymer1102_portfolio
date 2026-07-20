window.addEventListener('DOMContentLoaded', () => {
    const favicon = document.getElementById('animated-favicon');
    if (!favicon) return;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // 1. Define how many frames you have
    const totalFrames = 30; 
    let currentFrame = 1;
    const loadedImages = [];
    let imagesLoadedCount = 0;

    // 2. Preload all the frames so the animation is perfectly smooth
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // Construct the path to your sequential images
       img.src = `/images/favicon/frames/j_${i}.gif`;
        
        img.onload = () => {
            imagesLoadedCount++;
            if (imagesLoadedCount === totalFrames) {
                // All frames are ready in memory, start the sequencer loop
                startSequence();
            }
        };
        loadedImages.push(img);
    }

    function startSequence() {
        function play() {
            ctx.clearRect(0, 0, 32, 32);
            
            // Draw the current active frame file
            ctx.drawImage(loadedImages[currentFrame - 1], 0, 0, 32, 32);
            
            // Push it live to the favicon tag
            favicon.href = canvas.toDataURL('image/png');
            
            // Advance to the next frame file
            currentFrame = (currentFrame % totalFrames) + 1;
            
            // ~30 frames per second
            setTimeout(play, 33); 
        }
        play();
    }
});
