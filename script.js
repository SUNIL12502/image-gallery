// Theme toggle functionality
const themeButton = document.getElementById('themeButton');
const icon = themeButton.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Get the modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.querySelector('.prev-arrow');
const nextBtn = document.querySelector('.next-arrow');
const descriptionDiv = document.querySelector('.image-description');

// Zoom controls
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');

let currentZoom = 1;
const zoomStep = 0.2;
const maxZoom = 3;
const minZoom = 0.5;

// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

// Add click event to all gallery images
galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.querySelector('img').src;
        descriptionDiv.textContent = this.dataset.description;
        currentImageIndex = index;
        resetZoom();
    });
});

// Zoom functions
function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        updateZoom();
    }
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function updateZoom() {
    modalImg.style.transform = `scale(${currentZoom})`;
}

// Add zoom button events
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
resetZoomBtn.addEventListener('click', resetZoom);

// Add mouse wheel zoom
modalImg.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }
});

// Navigation functions
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    const nextItem = galleryItems[currentImageIndex];
    modalImg.src = nextItem.querySelector('img').src;
    descriptionDiv.textContent = nextItem.dataset.description;
    resetZoom();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    const prevItem = galleryItems[currentImageIndex];
    modalImg.src = prevItem.querySelector('img').src;
    descriptionDiv.textContent = prevItem.dataset.description;
    resetZoom();
}

// Add navigation button events
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Close modal when clicking the close button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    resetZoom();
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        resetZoom();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        resetZoom();
    }
    // Add keyboard navigation
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
}); 