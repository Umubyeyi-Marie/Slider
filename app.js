// Select navigation buttons
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

// Select carousel elements
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.list');
let thumbnailBorderDom = carouselDom.querySelector('.thumbnail');
let timeDom = carouselDom.querySelector('.time');

// Store thumbnails
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

// Move first thumbnail to the end (setup)
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Timers
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
    
    // Update active thumbnail
    updateActiveThumbnail();
}

// Add click event to thumbnails
thumbnailItemsDom.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Calculate how many clicks needed to show this slide
        const currentIndex = getCurrentSlideIndex();
        let clicksNeeded = index - currentIndex;
        
        if (clicksNeeded < 0) {
            clicksNeeded += SliderDom.querySelectorAll('.item').length;
        }
        
        // Click next the required number of times
        for (let i = 0; i < clicksNeeded; i++) {
            setTimeout(() => {
                nextDom.click();
            }, i * 100);
        }
    });
});

function getCurrentSlideIndex() {
    const firstSlideImage = SliderDom.querySelector('.item:first-child img').src;
    for (let i = 0; i < thumbnailItemsDom.length; i++) {
        if (thumbnailItemsDom[i].querySelector('img').src === firstSlideImage) {
            return i;
        }
    }
    return 0;
}

function updateActiveThumbnail() {
    const currentIndex = getCurrentSlideIndex();
    thumbnailItemsDom.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Pause auto-slide on hover
carouselDom.addEventListener('mouseenter', () => {
    clearTimeout(runNextAuto);
});

carouselDom.addEventListener('mouseleave', () => {
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
});

// Initialize active thumbnail
updateActiveThumbnail();