function throttle(fn, delay) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// Simulate an API call
function loadMoreProducts() {
    console.log(" Fetching more products...");
}

// Runs whenever the user scrolls
function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // User is within 200px of the bottom
    if (scrollTop + windowHeight >= pageHeight - 200) {
        loadMoreProducts();
    }
}

// Throttle the scroll handler
const throttledScroll = throttle(handleScroll, 500);

// Listen for scrolling
window.addEventListener("scroll", throttledScroll);