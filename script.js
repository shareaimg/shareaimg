// ============================================
// Configuration Loader
// ============================================

let config = {};

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        populatePage();
    } catch (error) {
        console.error('Error loading config:', error);
        // Fallback to default content if config fails to load
        alert('Failed to load configuration. Please ensure config.json exists.');
    }
}

// ============================================
// Page Population
// ============================================

function populatePage() {
    // Update meta tags and SEO
    if (config.site) {
        const siteUrl = config.site.url || window.location.origin + window.location.pathname;
        const siteImage = config.site.image ? (config.site.image.startsWith('http') ? config.site.image : siteUrl + config.site.image) : '';
        
        // Title
        if (config.site.title) {
            document.title = config.site.title;
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) pageTitle.textContent = config.site.title;
        }
        
        // Meta Description
        const metaDescription = document.getElementById('metaDescription');
        if (metaDescription && config.site.description) {
            metaDescription.content = config.site.description;
        }
        
        // Meta Keywords
        const metaKeywords = document.getElementById('metaKeywords');
        if (metaKeywords && config.site.keywords) {
            metaKeywords.content = config.site.keywords;
        }
        
        // Open Graph Tags
        const ogUrl = document.getElementById('ogUrl');
        const ogTitle = document.getElementById('ogTitle');
        const ogDescription = document.getElementById('ogDescription');
        const ogImage = document.getElementById('ogImage');
        
        if (ogUrl) ogUrl.content = siteUrl;
        if (ogTitle && config.site.title) ogTitle.content = config.site.title;
        if (ogDescription && config.site.description) ogDescription.content = config.site.description;
        if (ogImage && siteImage) ogImage.content = siteImage;
        
        // Twitter Card Tags
        const twitterUrl = document.getElementById('twitterUrl');
        const twitterTitle = document.getElementById('twitterTitle');
        const twitterDescription = document.getElementById('twitterDescription');
        const twitterImage = document.getElementById('twitterImage');
        
        if (twitterUrl) twitterUrl.content = siteUrl;
        if (twitterTitle && config.site.title) twitterTitle.content = config.site.title;
        if (twitterDescription && config.site.description) twitterDescription.content = config.site.description;
        if (twitterImage && siteImage) twitterImage.content = siteImage;
        
        // Canonical URL
        const canonicalUrl = document.getElementById('canonicalUrl');
        if (canonicalUrl) canonicalUrl.href = siteUrl;
        
        // Structured Data (JSON-LD)
        const structuredData = document.getElementById('structuredData');
        if (structuredData) {
            const jsonLd = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": config.site.name || "X Snap",
                "applicationCategory": "BrowserExtension",
                "operatingSystem": "Chrome",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "100"
                },
                "description": config.site.description || "",
                "url": siteUrl,
                "image": siteImage,
                "screenshot": siteImage,
                "softwareVersion": "1.0",
                "author": {
                    "@type": "Organization",
                    "name": "X Snap"
                },
                "downloadUrl": config.download?.ctaLink || "",
                "browserRequirements": "Requires Chrome. Free to use.",
                "featureList": [
                    "Convert Twitter tweets to share cards",
                    "One-click image generation",
                    "Multiple themes and layouts",
                    "QR code generation",
                    "High-quality image export"
                ]
            };
            structuredData.textContent = JSON.stringify(jsonLd);
        }
    }

    // Hero Section
    if (config.hero) {
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const heroDescription = document.getElementById('heroDescription');
        const heroCTA = document.getElementById('heroCTA');
        const heroPreviewImage = document.getElementById('heroPreviewImage');

        if (heroTitle && config.hero.title) heroTitle.textContent = config.hero.title;
        if (heroSubtitle && config.hero.subtitle) heroSubtitle.textContent = config.hero.subtitle;
        if (heroDescription && config.hero.description) heroDescription.textContent = config.hero.description;
        if (heroCTA && config.hero.ctaLink) {
            heroCTA.href = config.hero.ctaLink;
            heroCTA.target = '_blank';
            heroCTA.rel = 'noopener noreferrer';
            if (config.hero.ctaText) {
                heroCTA.querySelector('span').textContent = config.hero.ctaText;
            }
        }
        if (heroPreviewImage && config.hero.previewImage) {
            heroPreviewImage.src = config.hero.previewImage;
            heroPreviewImage.alt = `${config.hero.title || 'X Snap'} - Transform X (Twitter) posts into beautiful share card images`;
        }
        
        // Hero badges
        const heroBadges = document.getElementById('heroBadges');
        if (heroBadges && config.hero.badges) {
            heroBadges.innerHTML = '';
            config.hero.badges.forEach(badgeText => {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = badgeText;
                heroBadges.appendChild(badge);
            });
        }
    }

    // Features Section
    if (config.features) {
        const featuresTitle = document.getElementById('featuresTitle');
        const featuresSubtitle = document.getElementById('featuresSubtitle');
        const featuresGrid = document.getElementById('featuresGrid');

        if (featuresTitle && config.features.title) featuresTitle.textContent = config.features.title;
        if (featuresSubtitle && config.features.subtitle) featuresSubtitle.textContent = config.features.subtitle;

        if (featuresGrid && config.features.items) {
            featuresGrid.innerHTML = '';
            config.features.items.forEach(feature => {
                const featureCard = document.createElement('div');
                featureCard.className = 'feature-card';
                featureCard.innerHTML = `
                    <span class="feature-icon">${feature.icon || '✨'}</span>
                    <h3 class="feature-title">${feature.title || ''}</h3>
                    <p class="feature-description">${feature.description || ''}</p>
                `;
                featuresGrid.appendChild(featureCard);
            });
        }
    }

    // How to Use Section
    if (config.howToUse) {
        const howToUseTitle = document.getElementById('howToUseTitle');
        const howToUseSubtitle = document.getElementById('howToUseSubtitle');
        const stepsContainer = document.getElementById('stepsContainer');
        const howToUseDemo = document.getElementById('howToUseDemo');

        if (howToUseTitle && config.howToUse.title) howToUseTitle.textContent = config.howToUse.title;
        if (howToUseSubtitle && config.howToUse.subtitle) howToUseSubtitle.textContent = config.howToUse.subtitle;

        // Display demo image
        if (howToUseDemo && config.howToUse.demoImage) {
            howToUseDemo.innerHTML = `
                <div class="demo-image-wrapper">
                    <img src="${config.howToUse.demoImage}" alt="X Snap Chrome Extension - Click scissors icon on Twitter tweet to generate share card" class="demo-image" loading="lazy">
                </div>
            `;
        }

        if (stepsContainer && config.howToUse.steps) {
            stepsContainer.innerHTML = '';
            config.howToUse.steps.forEach(step => {
                const stepItem = document.createElement('div');
                stepItem.className = 'step-item';
                stepItem.innerHTML = `
                    <div class="step-number">${step.number || ''}</div>
                    <div class="step-content">
                        <div class="step-text">
                            <h3 class="step-title">${step.title || ''}</h3>
                            <p class="step-description">${step.description || ''}</p>
                        </div>
                    </div>
                `;
                stepsContainer.appendChild(stepItem);
            });
        }
    }

    // Gallery Section
    if (config.gallery) {
        const galleryTitle = document.getElementById('galleryTitle');
        const gallerySubtitle = document.getElementById('gallerySubtitle');
        const galleryGrid = document.getElementById('galleryGrid');

        if (galleryTitle && config.gallery.title) galleryTitle.textContent = config.gallery.title;
        if (gallerySubtitle && config.gallery.subtitle) gallerySubtitle.textContent = config.gallery.subtitle;

        if (galleryGrid && config.gallery.items) {
            galleryGrid.innerHTML = '';
            config.gallery.items.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <div class="gallery-image-wrapper">
                        <img src="${item.image || ''}" alt="${item.title || 'X Snap'} - ${item.description || 'Share card example'}" class="gallery-image" loading="lazy">
                    </div>
                    <div class="gallery-content">
                        <h3 class="gallery-item-title">${item.title || ''}</h3>
                        <p class="gallery-item-description">${item.description || ''}</p>
                    </div>
                `;
                
                // Add click event to open modal
                galleryItem.addEventListener('click', () => {
                    openGalleryModal(index);
                });
                
                galleryGrid.appendChild(galleryItem);
            });
        }
    }
    
    // FAQ Section
    if (config.faq) {
        const faqTitle = document.getElementById('faqTitle');
        const faqContainer = document.getElementById('faqContainer');

        if (faqTitle && config.faq.title) faqTitle.textContent = config.faq.title;

        if (faqContainer && config.faq.items) {
            faqContainer.innerHTML = '';
            config.faq.items.forEach((item, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <div class="faq-question">${item.question || ''}</div>
                    <div class="faq-answer">
                        <div class="faq-answer-content">${item.answer || ''}</div>
                    </div>
                `;
                faqContainer.appendChild(faqItem);

                // Add click event to toggle FAQ (click anywhere on card)
                faqItem.addEventListener('click', () => {
                    faqItem.classList.toggle('active');
                });
            });
        }
    }

    // Download CTA Section
    if (config.download) {
        const downloadTitle = document.getElementById('downloadTitle');
        const downloadSubtitle = document.getElementById('downloadSubtitle');
        const downloadCTA = document.getElementById('downloadCTA');

        if (downloadTitle && config.download.title) downloadTitle.textContent = config.download.title;
        if (downloadSubtitle && config.download.subtitle) downloadSubtitle.textContent = config.download.subtitle;
        if (downloadCTA && config.download.ctaLink) {
            downloadCTA.href = config.download.ctaLink;
            downloadCTA.target = '_blank';
            downloadCTA.rel = 'noopener noreferrer';
            if (config.download.ctaText) {
                downloadCTA.querySelector('span').textContent = config.download.ctaText;
            }
        }
    }

    // Footer
    if (config.footer) {
        const footerCopyright = document.getElementById('footerCopyright');
        const footerChromeWebStore = document.getElementById('footerChromeWebStore');
        const footerIssues = document.getElementById('footerIssues');
        const footerEmail = document.getElementById('footerEmail');
        const socialTwitter = document.getElementById('socialTwitter');
        const footerPrivacy = document.getElementById('footerPrivacy');
        const footerTerms = document.getElementById('footerTerms');

        if (footerCopyright && config.footer.copyright) {
            footerCopyright.textContent = config.footer.copyright;
        }
        
        // External links - open in new tab
        if (footerChromeWebStore && config.footer.links?.chromeWebStore) {
            footerChromeWebStore.href = config.footer.links.chromeWebStore;
            footerChromeWebStore.target = '_blank';
            footerChromeWebStore.rel = 'noopener noreferrer';
        }
        
        if (footerIssues && config.footer.links?.issues) {
            footerIssues.href = config.footer.links.issues;
            footerIssues.target = '_blank';
            footerIssues.rel = 'noopener noreferrer';
        }
        
        if (footerEmail && config.footer.links?.email) {
            footerEmail.href = config.footer.links.email;
            // Email links don't need target="_blank"
        }
        
        if (socialTwitter && config.footer.social?.twitter) {
            socialTwitter.href = config.footer.social.twitter;
            socialTwitter.target = '_blank';
            socialTwitter.rel = 'noopener noreferrer';
        }
        
        // Privacy and Terms - only set if not "#"
        if (footerPrivacy && config.footer.privacyPolicy && config.footer.privacyPolicy !== '#') {
            footerPrivacy.href = config.footer.privacyPolicy;
            if (config.footer.privacyPolicy.startsWith('http')) {
                footerPrivacy.target = '_blank';
                footerPrivacy.rel = 'noopener noreferrer';
            }
        } else if (footerPrivacy) {
            footerPrivacy.style.display = 'none';
        }
        
        if (footerTerms && config.footer.termsOfService && config.footer.termsOfService !== '#') {
            footerTerms.href = config.footer.termsOfService;
            if (config.footer.termsOfService.startsWith('http')) {
                footerTerms.target = '_blank';
                footerTerms.rel = 'noopener noreferrer';
            }
        } else if (footerTerms) {
            footerTerms.style.display = 'none';
        }
    }
}

// ============================================
// Gallery Modal Functions
// ============================================

let currentGalleryIndex = 0;

function openGalleryModal(index) {
    const modal = document.getElementById('galleryModal');
    
    if (modal) {
        currentGalleryIndex = index !== undefined ? index : 0;
        updateGalleryModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function updateGalleryModal() {
    if (!config.gallery || !config.gallery.items || config.gallery.items.length === 0) return;
    
    const item = config.gallery.items[currentGalleryIndex];
    const modalImage = document.getElementById('galleryModalImage');
    const modalTitle = document.getElementById('galleryModalTitle');
    const modalDescription = document.getElementById('galleryModalDescription');
    const modalPrev = document.getElementById('galleryModalPrev');
    const modalNext = document.getElementById('galleryModalNext');
    
    if (modalImage && item) {
        modalImage.src = item.image || '';
        modalImage.alt = item.title || '';
    }
    
    if (modalTitle && item) {
        modalTitle.textContent = item.title || '';
    }
    
    if (modalDescription && item) {
        modalDescription.textContent = item.description || '';
    }
    
    // Update navigation buttons visibility
    if (modalPrev && modalNext) {
        const totalItems = config.gallery.items.length;
        modalPrev.style.display = totalItems > 1 ? 'flex' : 'none';
        modalNext.style.display = totalItems > 1 ? 'flex' : 'none';
    }
}

function navigateGallery(direction) {
    if (!config.gallery || !config.gallery.items || config.gallery.items.length === 0) return;
    
    const totalItems = config.gallery.items.length;
    
    if (direction === 'prev') {
        currentGalleryIndex = (currentGalleryIndex - 1 + totalItems) % totalItems;
    } else if (direction === 'next') {
        currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
    }
    
    updateGalleryModal();
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize gallery modal event listeners
function initGalleryModal() {
    const galleryModalClose = document.getElementById('galleryModalClose');
    const galleryModalOverlay = document.getElementById('galleryModalOverlay');
    const galleryModalPrev = document.getElementById('galleryModalPrev');
    const galleryModalNext = document.getElementById('galleryModalNext');
    
    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }
    
    if (galleryModalOverlay) {
        galleryModalOverlay.addEventListener('click', closeGalleryModal);
    }
    
    if (galleryModalPrev) {
        galleryModalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery('prev');
        });
    }
    
    if (galleryModalNext) {
        galleryModalNext.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery('next');
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('galleryModal');
        if (!modal || !modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery('prev');
        } else if (e.key === 'ArrowRight') {
            navigateGallery('next');
        }
    });
}

// ============================================
// Navigation & Mobile Menu
// ============================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle anchor links (starting with #) and not external links
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // If href is just "#", prevent default to avoid jumping to top
        else if (href === '#') {
            e.preventDefault();
        }
    });
});

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step-item, .gallery-item, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ============================================
// Initialize
// ============================================

// Load config when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadConfig();
        initGalleryModal();
    });
} else {
    loadConfig();
    initGalleryModal();
}

