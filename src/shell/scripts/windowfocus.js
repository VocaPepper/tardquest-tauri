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
    // Skip any interactive control — dropdowns, volume slider, window-control
    // buttons, draggable sub-windows, and the password modal manage their own focus.
    if (event.target.closest(
        'select, input, button, textarea, a, .toolbar-strip, .window-control, .draggable-window, #passwordModal'
    )) {
        return;
    }

    // For everything else — border clicks, titlebar clicks, main-content
    // background — restore focus to the game iframe after the event settles
    requestAnimationFrame(focusGameFrame);
});

document.addEventListener('DOMContentLoaded', () => {
    windows.forEach(windowId => {
        setupWindowFocus(windowId);
    });
});
