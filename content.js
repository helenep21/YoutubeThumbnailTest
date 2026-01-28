console.log("YT Tester: Content script active.");

let lastTarget = null;

// Track right-clicks (Capturing phase)
document.addEventListener("mousedown", (event) => {
    // Button 2 = Right Click
    if (event.button === 2) {
        lastTarget = event.target;
        
        // DEBUG: Flash a red border on right-click so you KNOW it registered
        // If you don't see this red flash, the extension is not catching the click.
        const originalOutline = lastTarget.style.outline;
        lastTarget.style.outline = "3px dashed red";
        setTimeout(() => {
            lastTarget.style.outline = originalOutline;
        }, 500);
    }
}, true);

// Listen for background script command
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceVideo") {
        if (!lastTarget) {
            alert("Error: No target found. Please right-click inside the thumbnail.");
            return;
        }
        replaceContent(lastTarget);
    }
});

function replaceContent(target) {
    // Find the container (Supports old Polymer & new ViewModels)
    const container = target.closest('ytd-rich-item-renderer') || 
                      target.closest('yt-lockup-view-model') ||
                      target.closest('ytd-video-renderer') ||
                      target.closest('ytd-grid-video-renderer');

    if (!container) {
        alert("Could not find a video container here. Try right-clicking the image directly.");
        return;
    }

    chrome.storage.local.get(['testTitle', 'testThumbnail'], (data) => {
        if (!data.testTitle || !data.testThumbnail) {
            alert("No data saved! Please open extension popup and save first.");
            return;
        }

        // 1. Replace Title
        // Try multiple selectors to be safe
        const titleSelectors = [
            '#video-title', 
            '.yt-lockup-metadata-view-model__title span',
            '.yt-lockup-metadata-view-model__title',
            'h3 a span'
        ];
        
        let titleEl = null;
        for (let sel of titleSelectors) {
            titleEl = container.querySelector(sel);
            if (titleEl) break;
        }

        if (titleEl) {
            titleEl.textContent = data.testTitle;
            titleEl.innerText = data.testTitle;
            const link = titleEl.closest('a');
            if(link) link.title = data.testTitle;
        }

        // 2. Replace Thumbnail
        const imgSelectors = [
            'ytd-thumbnail img',
            'yt-thumbnail-view-model img',
            'img.yt-core-image' // Very generic fallback
        ];

        let imgEl = null;
        for (let sel of imgSelectors) {
            // Find the largest image in the container (avoid channel avatars)
            const images = container.querySelectorAll(sel);
            for(let img of images) {
                if (img.width > 50) { // arbitrary small size to filter avatars
                   imgEl = img;
                   break;
                }
            }
            if(imgEl) break;
        }

        if (imgEl) {
            imgEl.src = data.testThumbnail;
            imgEl.removeAttribute('srcset');
            imgEl.removeAttribute('loading');
            imgEl.style.objectFit = 'cover';
        }

        // 3. Success Green Border
        container.style.outline = "4px solid #0f9d58";
        setTimeout(() => container.style.outline = "none", 1500);
    });
}
