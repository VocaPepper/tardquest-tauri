let currentZIndex = 2000;
const windows = ['leaderboardWindow', 'tardtestWindow', 'apitestWindow'];

function bringWindowToFront(windowElement) {
    currentZIndex++;
    windowElement.style.zIndex = currentZIndex;
}

function setupWindowFocus(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.addEventListener('pointerdown', () => {
            bringWindowToFront(windowElement);
        });
    }
}

// ========================== Game Iframe Focus Restoration ==========================

function focusGameFrame() {
    const iframe = document.getElementById('gameFrame');
    if (!iframe) return;

    iframe.focus();
    try {
        iframe.contentWindow.focus();
    } catch (_) {
        // Cross-origin restriction — same-origin should succeed
    }
}

document.addEventListener('pointerdown', (event) => {
    // Don't steal focus from draggable sub-windows (they manage their own)
    if (event.target.closest('.draggable-window')) return;

    // Don't interfere with the password modal
    if (event.target.closest('#passwordModal')) return;

    // For everything else — border clicks, titlebar clicks, main-content
    // background — restore focus to the game iframe after the event settles
    requestAnimationFrame(focusGameFrame);
});

document.addEventListener('DOMContentLoaded', () => {
    windows.forEach(windowId => {
        setupWindowFocus(windowId);
    });
});
