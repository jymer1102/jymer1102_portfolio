(function animateFavicon() {
    const FRAME_COUNT = 94;
    const FRAME_INTERVAL_MS = 40; // ~25 frames per second

    // 1. Grab the initial working favicon tag from the page
    const initialFavicon = document.getElementById('favicon');
    if (!initialFavicon) return;

    // 2. Extract the directory path automatically from the working URL
    const currentHref = initialFavicon.href;
    const baseDir = currentHref.substring(0, currentHref.lastIndexOf('/') + 1);

    // 3. Build the frame URLs array
    const frameUrls = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
        frameUrls.push(`${baseDir}j_${i}.gif`);
    }

    // 4. Preload all frames in memory for smooth playback
    frameUrls.forEach(src => { 
        const img = new Image(); 
        img.src = src; 
    });

    let frameIndex = 0;

    // 5. Swap the link href attribute on a timer
    setInterval(() => {
        const link = document.getElementById('favicon');
        if (link) {
            link.href = frameUrls[frameIndex];
        }
        frameIndex = (frameIndex + 1) % FRAME_COUNT;
    }, FRAME_INTERVAL_MS);
})();
