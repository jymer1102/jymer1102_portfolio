(function animateFavicon() {
    const FRAME_COUNT = 94;
    const FRAME_INTERVAL_MS = 40; // ~25 fps

    // 1. Grab the existing link tag to steal its correct base path
    const existingFavicon = document.getElementById('animated-favicon');
    if (!existingFavicon) return;

    // 2. Extract the directory path dynamically (handles Jekyll subfolders perfectly)
    const currentHref = existingFavicon.getAttribute('href');
    const baseDir = currentHref.substring(0, currentHref.lastIndexOf('/') + 1);

    const frameUrls = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
        frameUrls.push(`${baseDir}j_${i}.gif`);
    }

    // Preload frames in background
    frameUrls.forEach(src => { 
        const img = new Image(); 
        img.src = src; 
    });

    let frameIndex = 0;

    function setFavicon(href) {
        let link = document.getElementById('animated-favicon');
        if (!link) {
            link = document.createElement('link');
            link.id = 'animated-favicon';
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = href;
    }

    setInterval(() => {
        setFavicon(frameUrls[frameIndex]);
        frameIndex = (frameIndex + 1) % FRAME_COUNT;
    }, FRAME_INTERVAL_MS);
})();
