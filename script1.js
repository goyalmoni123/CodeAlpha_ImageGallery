let currentIndex = 0;
let slideshowInterval;
const images = [
    { src: 'Images/Img1.jpg', caption: 'Rugged Terrain', description: 'Sturdy' },
    { src: 'Images/Img2.jpg', caption: 'Bold Look', description: 'Mighty' },
    { src: 'Images/img3.jpg', caption: 'Epic', description: 'Impressive' },
    { src: 'Images/img4.jpg', caption: 'Chill', description: 'Relaxed' },
    { src: 'Images/img5.jpg', caption: 'Bold Scene', description: 'Looks rugged' },
    { src: 'Images/img6.jpg', caption: 'Legendary', description: 'Powerful' },
    { src: 'Images/img7.jpg', caption: 'Calm', description: 'Serene' },
    { src: 'Images/img8.jpg', caption: 'Majestic', description: 'Impressive' }
];

function changeImage(src, caption, description) {
    document.getElementById('current-image').src = src;
    document.getElementById('caption').innerText = caption;
    document.getElementById('description').innerText = description;
    currentIndex = images.findIndex(image => image.src === src);
    updateThumbnails();
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateMainImage();
}

function nextImage() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateMainImage();
}

function updateMainImage() {
    const image = images[currentIndex];
    document.getElementById('current-image').src = image.src;
    document.getElementById('caption').innerText = image.caption;
    document.getElementById('description').innerText = image.description;
    updateThumbnails();
    resetProgressBar();
}

function updateThumbnails() {
    document.querySelectorAll('.thumbnails img').forEach((thumbnail, index) => {
        if (index === currentIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

function startSlideshow() {
    slideshowInterval = setInterval(nextImage, 5000);
    resetProgressBar();
}

function resetProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    }, 10);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    } else if (event.key === 'Enter') {
        toggleFullscreen();
    }
});

document.getElementById('current-image').addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    const img = document.getElementById('current-image');
    if (!document.fullscreenElement) {
        img.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
}

// Start the slideshow when the page loads
window.onload = startSlideshow;
