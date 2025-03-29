/* Created by Sunil Sharma */

// Theme management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Sample image data
const images = [
    {
        id: 1,
        src: './images/Sun.jpg',
        alt: 'Professional portrait of Sunil Sharma in a modern office with city view',
        caption: 'Sunil Sharma - Project owner of Sunil'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        alt: 'Beautiful mountain landscape',
        caption: 'Mountain Majesty'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
        alt: 'Urban cityscape at night',
        caption: 'City Lights'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
        alt: 'Modern architectural building',
        caption: 'Modern Architecture'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        alt: 'Delicious gourmet food',
        caption: 'Gourmet Delights'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        alt: 'Scenic travel destination',
        caption: 'Travel Dreams'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        alt: 'Technology gadgets and devices',
        caption: 'Tech World'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        alt: 'Beautiful beach sunset',
        caption: 'Beach Sunset'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493',
        alt: 'Healthcare professionals in a modern hospital',
        caption: 'Healthcare Heroes'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
        alt: 'Financial trading floor with multiple screens',
        caption: 'Financial Markets'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        alt: 'Business team in a modern office',
        caption: 'Corporate Team'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        alt: 'Educational institution library',
        caption: 'Education Hub'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
        alt: 'Startup office with creative workspace',
        caption: 'Startup Culture'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
        alt: 'E-commerce warehouse with robots',
        caption: 'E-commerce Logistics'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        alt: 'Research laboratory with scientists',
        caption: 'Scientific Research'
    },
    
];

// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const searchInput = document.getElementById('searchInput');

// State variables
let currentImageIndex = 0;
let filteredImages = [...images];

// Initialize gallery
function initGallery() {
    displayImages(images);
    setupEventListeners();
}

// Display images in the gallery
function displayImages(imagesToShow) {
    gallery.innerHTML = '';
    
    imagesToShow.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        gallery.appendChild(galleryItem);
    });
}

// Create a gallery item element
function createGalleryItem(image, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item loading';
    div.setAttribute('role', 'listitem');
    div.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" loading="lazy" 
            onload="this.parentElement.classList.remove('loading')"
            onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+Not+Found';">
        <div class="caption">${image.caption}</div>
        <div class="overlay"></div>
    `;
    
    div.addEventListener('click', () => openLightbox(index));
    // Add keyboard support for gallery items
    div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
        }
    });
    div.setAttribute('tabindex', '0');
    return div;
}

// Setup event listeners
function setupEventListeners() {
    // Lightbox navigation
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));
    nextBtn.addEventListener('click', () => navigateLightbox('next'));
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
            if (e.key === 'Escape') closeLightbox();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus the close button when lightbox opens
    closeBtn.focus();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Navigate between images in lightbox
function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    } else {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    }
    updateLightbox();
}

// Update lightbox content
function updateLightbox() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.parentElement.classList.add('loading');
    lightboxImg.onload = () => {
        lightboxImg.parentElement.classList.remove('loading');
    };
    lightboxImg.onerror = () => {
        lightboxImg.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
        lightboxImg.parentElement.classList.remove('loading');
    };
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.caption;
}

// Handle search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredImages = images.filter(image => 
        image.caption.toLowerCase().includes(searchTerm) ||
        image.alt.toLowerCase().includes(searchTerm)
    );
    displayImages(filteredImages);
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery); 