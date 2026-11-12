/**
 * BIKEFIX - Main JavaScript Engine
 * Theme, RTL, Navigation, Interactive Sliders, Estimators, Filters & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndDirection();
  initMobileDrawer();
  initHeroCarousel();
  initBeforeAfterSliders();
  initAccordions();
  initPricingPage();
  initServicesDiagnosis();
  initPartsCatalogue();
  initInteractiveDiagram();
  initFormDemonstrations();
  initPasswordToggles();
  updateCurrentYear();
  initScrollProgressBar();
  initScrollAnimations();
});

/* ---------------------------------------------------------
   1. Theme & RTL Direction Handling
   --------------------------------------------------------- */
function initThemeAndDirection() {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const rtlToggle = document.querySelector('[data-rtl-toggle]');

  // Theme
  const savedTheme = localStorage.getItem('bikefix-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  root.classList.toggle('dark', savedTheme === 'dark');
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      root.classList.toggle('dark', next === 'dark');
      localStorage.setItem('bikefix-theme', next);
      updateThemeIcon(next);
      showToast(`Switched to ${next} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  // RTL
  const savedDir = localStorage.getItem('bikefix-dir') || 'ltr';
  body.setAttribute('dir', savedDir);
  updateRTLIcon(savedDir);

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const current = body.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      body.setAttribute('dir', next);
      localStorage.setItem('bikefix-dir', next);
      updateRTLIcon(next);
      showToast(`Text direction: ${next.toUpperCase()}`);
    });
  }

  function updateRTLIcon(dir) {
    if (!rtlToggle) return;
    rtlToggle.innerHTML = dir === 'rtl'
      ? '<i class="fa-solid fa-align-left" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-align-right" aria-hidden="true"></i>';
    rtlToggle.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'}`);
  }
}

/* ---------------------------------------------------------
   2. Mobile Drawer Navigation
   --------------------------------------------------------- */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-menu-button');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');

  if (!openBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ---------------------------------------------------------
   3. Interactive Before / After Sliders (Home 2)
   --------------------------------------------------------- */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-container');

  sliders.forEach(slider => {
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const x = clientX - rect.left;
      let pos = (x / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      slider.style.setProperty('--slider-pos', `${pos}%`);
    };

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* ---------------------------------------------------------
   4. Accordions (Service details, FAQs)
   --------------------------------------------------------- */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close sibling items in the same container
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) sibling.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

/* ---------------------------------------------------------
   5. Pricing Page: Dynamic Vehicle Pricing & Estimator
   --------------------------------------------------------- */
function initPricingPage() {
  const vehicleToggles = document.querySelectorAll('[data-pricing-vehicle]');
  const estimatorVehicle = document.getElementById('est-vehicle');
  const estimatorService = document.getElementById('est-service');
  const estimatorParts = document.getElementById('est-parts');
  const estimatorResult = document.getElementById('est-price-display');

  // Package Data
  const packages = {
    motorcycle: {
      essential: { price: '₹599', label: 'Motorcycle Essential Check' },
      complete: { price: '₹1,499', label: 'Motorcycle Complete Care' },
      premium: { price: '₹2,799', label: 'Motorcycle Premium Maintenance' }
    },
    bicycle: {
      essential: { price: '₹249', label: 'Bicycle Basic Tune-Up' },
      complete: { price: '₹699', label: 'Bicycle Complete Care' },
      premium: { price: '₹1,299', label: 'Bicycle Master Overhaul' }
    }
  };

  const serviceRates = {
    bicycle: {
      puncture: 50,
      brake_adjust: 120,
      chain_service: 150,
      gear_tuning: 180,
      wheel_truing: 250,
      full_overhaul: 699
    },
    motorcycle: {
      puncture: 120,
      brake_adjust: 250,
      chain_service: 350,
      gear_tuning: 450,
      wheel_truing: 550,
      full_overhaul: 1499
    }
  };

  if (vehicleToggles.length > 0) {
    vehicleToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        vehicleToggles.forEach(b => b.classList.remove('active', 'button-primary'));
        vehicleToggles.forEach(b => b.classList.add('button-secondary'));
        btn.classList.add('active', 'button-primary');
        btn.classList.remove('button-secondary');

        const vehicle = btn.dataset.pricingVehicle;
        updatePricingCards(vehicle);
        updatePricingTable(vehicle);

        if (estimatorVehicle) {
          estimatorVehicle.value = vehicle;
          calculateEstimate();
        }
      });
    });
  }

  function updatePricingCards(vehicle) {
    const essentialEl = document.querySelector('[data-plan="essential"] .plan-price');
    const completeEl = document.querySelector('[data-plan="complete"] .plan-price');
    const premiumEl = document.querySelector('[data-plan="premium"] .plan-price');

    if (essentialEl && packages[vehicle]) essentialEl.textContent = packages[vehicle].essential.price;
    if (completeEl && packages[vehicle]) completeEl.textContent = packages[vehicle].complete.price;
    if (premiumEl && packages[vehicle]) premiumEl.textContent = packages[vehicle].premium.price;
  }

  function updatePricingTable(vehicle) {
    const rows = document.querySelectorAll('[data-service-row]');
    rows.forEach(row => {
      const type = row.dataset.vehicleType;
      if (type === 'all' || type === vehicle) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  function calculateEstimate() {
    if (!estimatorVehicle || !estimatorService || !estimatorResult) return;
    const vehicle = estimatorVehicle.value || 'bicycle';
    const service = estimatorService.value || 'puncture';
    const includeParts = estimatorParts && estimatorParts.checked;

    let base = (serviceRates[vehicle] && serviceRates[vehicle][service]) || 50;
    if (includeParts) {
      base += vehicle === 'motorcycle' ? 250 : 100;
    }

    animateCounter(estimatorResult, base);
  }

  function animateCounter(element, target) {
    element.textContent = `₹${target}`;
  }

  if (estimatorVehicle) estimatorVehicle.addEventListener('change', calculateEstimate);
  if (estimatorService) estimatorService.addEventListener('change', calculateEstimate);
  if (estimatorParts) estimatorParts.addEventListener('change', calculateEstimate);

  calculateEstimate();
}

/* ---------------------------------------------------------
   6. Services Page: Interactive Diagnosis Matrix
   --------------------------------------------------------- */
function initServicesDiagnosis() {
  const symptomRows = document.querySelectorAll('.symptom-row');
  const diagCard = document.getElementById('diagnosis-card');
  const serviceBookingSelect = document.getElementById('booking-service-select');
  const vehicleBookingSelect = document.getElementById('booking-vehicle-select');

  symptomRows.forEach(row => {
    row.addEventListener('click', () => {
      symptomRows.forEach(r => r.classList.remove('active-symptom'));
      row.classList.add('active-symptom');

      const symptom = row.dataset.symptom;
      const suggested = row.dataset.service;
      const vehicle = row.dataset.vehicle || 'all';

      if (diagCard) {
        diagCard.innerHTML = `
          <div class="p-6 bg-blue-50 dark:bg-slate-800 rounded-xl border-2 border-blue-500">
            <span class="badge badge-blue mb-2">Automated Diagnostic Assessment</span>
            <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Issue: ${row.dataset.symptomTitle || symptom}</h4>
            <p class="text-slate-600 dark:text-slate-300 text-sm mb-4">${row.dataset.diagnosisDesc || 'Our certified mechanics inspect tolerances, clearances, and wear indicators.'}</p>
            <div class="flex items-center justify-between pt-3 border-t border-blue-200 dark:border-slate-700">
              <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">Suggested Action: <strong>${suggested}</strong></span>
              <a href="#booking-form" class="button button-primary text-xs py-2 px-4" data-select-service="${suggested}">Preselect in Booking →</a>
            </div>
          </div>
        `;

        const preselectBtn = diagCard.querySelector('[data-select-service]');
        if (preselectBtn && serviceBookingSelect) {
          preselectBtn.addEventListener('click', () => {
            serviceBookingSelect.value = suggested;
            if (vehicleBookingSelect && vehicle !== 'all') {
              vehicleBookingSelect.value = vehicle;
            }
          });
        }
      }
    });
  });
}

/* ---------------------------------------------------------
   7. Spare Parts Catalogue: Search, Filters, Quick View
   --------------------------------------------------------- */
function initPartsCatalogue() {
  const searchInput = document.getElementById('parts-search');
  const vehicleTabs = document.querySelectorAll('[data-parts-vehicle]');
  const categoryChips = document.querySelectorAll('[data-parts-cat]');
  const sortSelect = document.getElementById('parts-sort');
  const inStockCheck = document.getElementById('parts-stock-only');
  const partsGrid = document.querySelector('.parts-grid');
  const modalOverlay = document.getElementById('part-modal-overlay');
  const modalClose = document.getElementById('part-modal-close');

  if (!partsGrid) return;

  const cards = Array.from(partsGrid.querySelectorAll('.parts-card'));

  let currentVehicle = 'all';
  let currentCategory = 'all';
  let searchQuery = '';
  let stockOnly = false;

  const filterCards = () => {
    let visibleCount = 0;

    cards.forEach(card => {
      const cardVeh = card.dataset.vehicle || 'all';
      const cardCat = card.dataset.category || 'all';
      const cardTitle = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const inStock = card.dataset.stock === 'true';

      const matchVehicle = currentVehicle === 'all' || cardVeh === 'all' || cardVeh === currentVehicle;
      const matchCat = currentCategory === 'all' || cardCat === currentCategory;
      const matchSearch = cardTitle.includes(searchQuery.toLowerCase());
      const matchStock = !stockOnly || inStock;

      if (matchVehicle && matchCat && matchSearch && matchStock) {
        card.style.display = '';
        if (window.BikeFixScrollRevealElement) {
          window.BikeFixScrollRevealElement(card, true);
        }
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('parts-empty-notice');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  // Vehicle Tabs
  vehicleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vehicleTabs.forEach(t => t.classList.remove('active', 'button-primary'));
      vehicleTabs.forEach(t => t.classList.add('button-secondary'));
      tab.classList.add('active', 'button-primary');
      tab.classList.remove('button-secondary');
      currentVehicle = tab.dataset.partsVehicle;
      filterCards();
    });
  });

  // Category Chips
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active', 'bg-blue-600', 'text-white'));
      chip.classList.add('active', 'bg-blue-600', 'text-white');
      currentCategory = chip.dataset.partsCat;
      filterCards();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      filterCards();
    });
  }

  // In-stock Checkbox
  if (inStockCheck) {
    inStockCheck.addEventListener('change', (e) => {
      stockOnly = e.target.checked;
      filterCards();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const mode = e.target.value;
      cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price || '0', 10);
        const priceB = parseInt(b.dataset.price || '0', 10);
        if (mode === 'price-low') return priceA - priceB;
        if (mode === 'price-high') return priceB - priceA;
        return 0;
      });
      cards.forEach(card => partsGrid.appendChild(card));
    });
  }

  // Quick View Modal
  document.querySelectorAll('[data-open-part-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.parts-card');
      if (!card || !modalOverlay) return;

      const title = card.querySelector('h3')?.textContent || 'Spare Part';
      const price = card.dataset.price ? `₹${card.dataset.price}` : '₹--';
      const imgSrc = card.querySelector('img')?.getAttribute('src') || '';
      const brand = card.dataset.brand || 'OEM Certified';
      const compat = card.dataset.compat || 'Universal Fit';
      const partDesc = card.dataset.desc || 'Tested and verified genuine replacement component for maximum reliability.';

      document.getElementById('modal-part-title').textContent = title;
      document.getElementById('modal-part-price').textContent = price;
      document.getElementById('modal-part-brand').textContent = brand;
      document.getElementById('modal-part-compat').textContent = compat;
      document.getElementById('modal-part-desc').textContent = partDesc;
      const modalImg = document.getElementById('modal-part-img');
      if (modalImg) modalImg.src = imgSrc;

      const modalEnquireBtn = document.getElementById('modal-enquire-btn');
      if (modalEnquireBtn) {
        modalEnquireBtn.href = `#parts-enquiry-form`;
        modalEnquireBtn.addEventListener('click', () => {
          modalOverlay.classList.remove('open');
          const partInput = document.getElementById('enquiry-part-name');
          if (partInput) partInput.value = title;
        });
      }

      modalOverlay.classList.add('open');
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }
}

/* ---------------------------------------------------------
   8. Home 2: Mechanical Care Diagram Hotspots
   --------------------------------------------------------- */
function initInteractiveDiagram() {
  const allTriggers = document.querySelectorAll('[data-diagram-tab]');
  const tabButtons = document.querySelectorAll('.grid [data-diagram-tab]');
  const hotspotDots = document.querySelectorAll('button.rounded-full[data-diagram-tab]');
  const diagramPanels = document.querySelectorAll('[data-diagram-panel]');

  if (allTriggers.length === 0) return;

  allTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.dataset.diagramTab;

      tabButtons.forEach(btn => {
        const isTarget = btn.dataset.diagramTab === target;
        btn.classList.toggle('active', isTarget);
        btn.classList.toggle('border-blue-600', isTarget);
        btn.classList.toggle('bg-blue-50', isTarget);
        btn.classList.toggle('text-blue-700', isTarget);
        btn.classList.toggle('dark:bg-slate-800', isTarget);
        btn.classList.toggle('dark:text-blue-400', isTarget);
        btn.classList.toggle('dark:border-blue-500', isTarget);
        btn.classList.toggle('shadow-sm', isTarget);

        btn.classList.toggle('border-slate-200', !isTarget);
        btn.classList.toggle('dark:border-slate-700', !isTarget);
        btn.classList.toggle('text-slate-700', !isTarget);
        btn.classList.toggle('dark:text-slate-300', !isTarget);
      });

      hotspotDots.forEach(dot => {
        const isTarget = dot.dataset.diagramTab === target;
        dot.classList.toggle('ring-4', isTarget);
        dot.classList.toggle('ring-blue-400/60', isTarget);
        dot.classList.toggle('scale-110', isTarget);
      });

      diagramPanels.forEach(panel => {
        panel.style.display = panel.dataset.diagramPanel === target ? 'block' : 'none';
      });
    });
  });
}

/* ---------------------------------------------------------
   9. Form Demonstrations & Feedback
   --------------------------------------------------------- */
function initFormDemonstrations() {
  const bookingForms = document.querySelectorAll('form[data-booking-form]');
  const contactForms = document.querySelectorAll('form[data-contact-form]');
  const enquiryForms = document.querySelectorAll('form[data-enquiry-form]');
  const authForms = document.querySelectorAll('form[data-auth-form]');

  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ref = `BF-${Math.floor(10000 + Math.random() * 90000)}`;
      showToast(`Appointment Requested! Reference: ${ref}. Our workshop manager will call to confirm.`);
      form.reset();
    });
  });

  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been received. We will respond within 2 business hours.');
      form.reset();
    });
  });

  enquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ref = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      showToast(`Part Availability Enquiry #${ref} logged. We will verify stock and contact you.`);
      form.reset();
    });
  });

  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value || 'user';
      showToast(`Demo authentication success for ${email}. Redirecting...`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  });
}

/* ---------------------------------------------------------
   10. Password Reveal Eye Toggle
   --------------------------------------------------------- */
function initPasswordToggles() {
  document.querySelectorAll('[data-toggle-password], .password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.innerHTML = isPass
        ? '<i class="fa-regular fa-eye-slash" aria-hidden="true"></i>'
        : '<i class="fa-regular fa-eye" aria-hidden="true"></i>';
    });
  });
}

/* ---------------------------------------------------------
   11. Toast Notifications
   --------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-green-500"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ---------------------------------------------------------
   12. Current Year
   --------------------------------------------------------- */
function updateCurrentYear() {
  document.querySelectorAll('#year, .current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------------------------------------------------------
   13. Hero Multi-Slide Carousel (Home 1 - Matching Reference Layout)
   --------------------------------------------------------- */
function initHeroCarousel() {
  const heroSection = document.querySelector('.hero-automotive-stage[data-hero-carousel]');
  if (!heroSection) return;

  const HERO_SLIDES = [
    {
      eyebrow: "Certified Workshop Care",
      badgeColor: "bg-emerald-500",
      headlineStart: "We Believe Every Ride",
      headlineHighlight: "Deserves Expert Care.",
      description: "From everyday bicycle repairs to high-performance motorcycle maintenance, get reliable, certified service from experienced workshop mechanics using precision tools and genuine parts.",
      cardImage: "assets/images/home-1/slide-1-card.jpg",
      bgImage: "assets/images/home-1/slide-1-bg.jpg",
      cardTag: "PRECISION ENGINE DIAGNOSTICS",
      cardTitle: "State-of-the-art computerized diagnostics & 40-point safety inspection."
    },
    {
      eyebrow: "Smooth Pedal Performance",
      badgeColor: "bg-blue-500",
      headlineStart: "Experience Zero Slip and",
      headlineHighlight: "Flawless Gear Shifts.",
      description: "Complete ultrasonic chain degreasing, hanger laser alignment, and electronic Di2 / AXS wireless shifter micro-adjustments for friction-free commuter and racing drivetrains.",
      cardImage: "assets/images/home-1/slide-2-card.jpg",
      bgImage: "assets/images/home-1/slide-2-bg.jpg",
      cardTag: "ULTRASONIC DRIVETRAIN TUNING",
      cardTitle: "Laser-straight chain alignment & whisper-quiet derailleur tuning."
    },
    {
      eyebrow: "Critical Safety Systems",
      badgeColor: "bg-indigo-500",
      headlineStart: "Maximum Stopping Power When",
      headlineHighlight: "Every Second Counts.",
      description: "Dual-line vacuum fluid bleeding, ultrasonic caliper piston cleaning, and micrometric disc rotor truing to ensure instant, fade-free braking response on road and trail.",
      cardImage: "assets/images/home-1/slide-3-card.jpg",
      bgImage: "assets/images/home-1/slide-3-bg.jpg",
      cardTag: "HYDRAULIC BRAKE OVERHAUL",
      cardTitle: "High-pressure brake calibration and zero-fade stopping performance."
    },
    {
      eyebrow: "Dynamic Handling & Balance",
      badgeColor: "bg-sky-500",
      headlineStart: "Tuned to Your Weight for",
      headlineHighlight: "Sublime Road Control.",
      description: "Spoke tensiometer balancing within 5% deviation, fork stanchion oil seal rebuilds, and custom preload sag setup matched to rider geometry and riding style.",
      cardImage: "assets/images/home-1/slide-4-card.jpg",
      bgImage: "assets/images/home-1/slide-4-bg.jpg",
      cardTag: "PRECISION WHEEL TRUING",
      cardTitle: "Micron-level spoke tension balancing for balanced, vibration-free riding."
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideCount = HERO_SLIDES.length;

  // DOM Elements
  const bgSlides = heroSection.querySelectorAll('.hero-bg-slide');
  const eyebrowEl = heroSection.querySelector('#hero-slide-eyebrow-text');
  const beaconEl = heroSection.querySelector('#hero-slide-beacon');
  const headlineEl = heroSection.querySelector('#hero-slide-headline');
  const descEl = heroSection.querySelector('#hero-slide-desc');
  const activeImgEl = heroSection.querySelector('#hero-active-img');
  const activeTagEl = heroSection.querySelector('#hero-active-tag');
  const activeTitleEl = heroSection.querySelector('#hero-active-title');
  const previewImgEl = heroSection.querySelector('#hero-preview-img');
  const dotsContainer = heroSection.querySelector('#hero-dots-container');
  const nextBtn = heroSection.querySelector('.hero-nav-next');
  const prevBtn = heroSection.querySelector('.hero-nav-prev');

  function renderSlide(index) {
    const slide = HERO_SLIDES[index];
    const nextIndex = (index + 1) % slideCount;
    const nextSlide = HERO_SLIDES[nextIndex];

    // 1. Update Background Slides
    bgSlides.forEach((bg, i) => {
      bg.classList.toggle('active', i === index);
    });

    // 2. Animate and update Left Column text
    if (eyebrowEl) eyebrowEl.textContent = slide.eyebrow;
    if (beaconEl) {
      beaconEl.className = `beacon-dot ${slide.badgeColor}`;
    }

    if (headlineEl) {
      headlineEl.innerHTML = `${slide.headlineStart}<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-blue-700 to-indigo-800 dark:from-teal-300 dark:via-sky-300 dark:to-blue-400">${slide.headlineHighlight}</span>`;
    }

    if (descEl) descEl.textContent = slide.description;

    // 3. Update Foreground Card Stack
    if (activeImgEl) {
      activeImgEl.style.opacity = '0.35';
      activeImgEl.style.transform = 'scale(0.97)';
      setTimeout(() => {
        activeImgEl.src = slide.cardImage;
        activeImgEl.alt = slide.cardTag;
        activeImgEl.style.opacity = '1';
        activeImgEl.style.transform = 'scale(1)';
      }, 150);
    }

    if (activeTagEl) activeTagEl.textContent = slide.cardTag;
    if (activeTitleEl) activeTitleEl.textContent = slide.cardTitle;

    // Preview card behind shows next slide
    if (previewImgEl) {
      previewImgEl.src = nextSlide.cardImage;
      previewImgEl.alt = nextSlide.cardTag;
    }

    // 4. Update Pagination Indicator Pill
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.hero-dot-indicator');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    currentIndex = index;
  }

  function nextSlide() {
    renderSlide((currentIndex + 1) % slideCount);
  }

  function prevSlide() {
    renderSlide((currentIndex - 1 + slideCount) % slideCount);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  // Dot Click Listeners
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.hero-dot-indicator');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        renderSlide(idx);
        startAutoplay();
      });
    });
  }

  // Pause on hover
  heroSection.addEventListener('mouseenter', stopAutoplay);
  heroSection.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;

  heroSection.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  heroSection.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) nextSlide();
        else prevSlide();
        startAutoplay();
      } else if (Math.abs(diffY) > 50) {
        if (diffY < 0) nextSlide();
        else prevSlide();
        startAutoplay();
      }
    }
  }, { passive: true });

  // Initial render & autoplay start
  renderSlide(0);
  startAutoplay();
}

/* ---------------------------------------------------------
   14. Scroll Progress Bar & Section Scroll Animations
   --------------------------------------------------------- */
function initScrollProgressBar() {
  const existing = document.querySelector('.scroll-progress-bar');
  if (existing) return;

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  let ticking = false;

  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const maxScroll = doc.scrollHeight - window.innerHeight;

    if (maxScroll <= 60) {
      progressBar.style.opacity = '0';
      progressBar.style.transform = 'scaleX(0)';
    } else {
      const ratio = Math.max(0, Math.min(1, scrollTop / maxScroll));
      progressBar.style.opacity = '1';
      progressBar.style.transform = `scaleX(${ratio})`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });

  updateProgress();
}

function initScrollAnimations() {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const registered = new Set();
  let observer = null;

  const isExcluded = (el) => {
    if (!el || el.nodeType !== 1) return true;
    return Boolean(
      el.closest('.modal-overlay, .mobile-drawer, .sticky-mobile-bar, header.site-header') ||
      el.classList.contains('hero-bg-slide') ||
      el.classList.contains('hero-card-preview') ||
      el.classList.contains('hero-nav-controls') ||
      el.classList.contains('hero-pagination-pill') ||
      el.classList.contains('glow-blue-aura') ||
      el.classList.contains('bg-mechanical-grid') ||
      el.classList.contains('light-streak') ||
      el.classList.contains('rotate-gear')
    );
  };

  const hasRegisteredAncestor = (el) => {
    let parent = el.parentElement;
    while (parent) {
      if (registered.has(parent)) return true;
      parent = parent.parentElement;
    }
    return false;
  };

  const finishReveal = (el) => {
    if (!el || el.dataset.revealCleaned === 'true') return;
    el.dataset.revealCleaned = 'true';
    el.classList.remove('scroll-reveal', 'is-visible');
    el.removeAttribute('data-scroll-anim');
    el.style.transitionDelay = '';
    el.style.willChange = '';
  };

  const revealElement = (el, immediate = false) => {
    if (!el || el.dataset.revealCleaned === 'true') return;

    if (observer) {
      observer.unobserve(el);
    }

    if (immediate) {
      el.style.transitionDelay = '0ms';
      finishReveal(el);
      return;
    }

    if (el.classList.contains('is-visible')) return;

    const delayMs = parseInt(el.style.transitionDelay || '0', 10) || 0;
    el.classList.add('is-visible');

    // Keep timeline conduit classes so horizontal scaleX(1) stays active
    if (el.classList.contains('scroll-conduit')) return;

    const onEnd = (e) => {
      if (e.target === el && (e.propertyName === 'opacity' || e.propertyName === 'translate')) {
        el.removeEventListener('transitionend', onEnd);
        finishReveal(el);
      }
    };
    el.addEventListener('transitionend', onEnd);
    setTimeout(() => {
      el.removeEventListener('transitionend', onEnd);
      finishReveal(el);
    }, delayMs + 900);
  };

  // Expose helper so dynamically filtered parts cards never stay invisible
  window.BikeFixScrollRevealElement = revealElement;

  const registerTarget = (el, anim = 'fade-up', delay = 0) => {
    if (!el || registered.has(el) || isExcluded(el) || hasRegisteredAncestor(el)) return;
    registered.add(el);
    el.classList.add('scroll-reveal');
    el.setAttribute('data-scroll-anim', anim);
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }
  };

  const staggerList = (elements, anim = 'fade-up', step = 75, maxCycle = 4) => {
    Array.from(elements).forEach((el, idx) => {
      const delay = (idx % maxCycle) * step;
      registerTarget(el, anim, delay);
    });
  };

  // 1. Hero & Auth Page Initial Entrance
  const firstHero = document.querySelector('main > section:first-of-type');
  if (firstHero) {
    const heroLeftCol = firstHero.querySelector('.lg\\:col-span-7, .max-w-3xl');
    if (heroLeftCol) {
      const copyBlocks = heroLeftCol.querySelectorAll(':scope > div, :scope > h1, :scope > p, :scope > span');
      staggerList(copyBlocks, 'fade-up', 65, 6);
    }

    const heroRightVisual = firstHero.querySelector('.lg\\:col-span-5');
    if (heroRightVisual) {
      const stackOrFrame = heroRightVisual.querySelector('.hero-card-stack, .rounded-3xl') || heroRightVisual;
      registerTarget(stackOrFrame, 'zoom-in', 140);
    }
  } else {
    // Auth Pages (login.html / signup.html)
    const authCard = document.querySelector('body > div .card-contrast-heroic');
    if (authCard) registerTarget(authCard, 'zoom-in', 60);
  }

  // 2. Process Timeline Conduit Line Draw-In
  document.querySelectorAll('.timeline-conduit').forEach(conduit => {
    registered.add(conduit);
    conduit.classList.add('scroll-conduit');
  });

  // 3. Section Titles & Top Section Headers
  document.querySelectorAll('.section-title').forEach(el => {
    registerTarget(el, 'fade-up', 0);
  });

  document.querySelectorAll('main section .container > .flex.justify-between, main section .container > .text-center').forEach(el => {
    if (!el.closest('.rounded-3xl')) {
      registerTarget(el, 'fade-up', 0);
    }
  });

  const animateSplitCol = (col, slideAnim, baseDelay = 0) => {
    const stackedCards = col.querySelectorAll('.card, .card-contrast-heroic, .space-y-4 > div, .gap-6 > div');
    const isGalleryGrid = col.classList.contains('grid');

    if (isGalleryGrid) {
      const photos = Array.from(col.children).filter(child => child.nodeType === 1);
      staggerList(photos, 'zoom-in', 90, 4);
      return;
    }

    if (stackedCards.length >= 2) {
      const stackedSet = new Set(stackedCards);
      const introItems = Array.from(col.children).filter(
        c => !stackedSet.has(c) && !c.classList.contains('space-y-4') && !c.classList.contains('gap-6')
      );
      introItems.forEach((item, i) => registerTarget(item, slideAnim, baseDelay + i * 50));
      staggerList(stackedCards, 'fade-up', 75, 6);
    } else {
      registerTarget(col, slideAnim, baseDelay);
    }
  };

  // 4. Content Sections Choreography
  document.querySelectorAll('main > section:not(:first-of-type)').forEach(section => {
    // Emergency triage layout (index.html Section 02)
    const triageGrid = section.querySelector('.rounded-3xl .grid.lg\\:grid-cols-12');
    if (triageGrid) {
      const triageIntro = triageGrid.querySelector('.lg\\:col-span-7 > div:first-child');
      if (triageIntro) registerTarget(triageIntro, 'fade-up', 0);

      const triageTiles = triageGrid.querySelectorAll('.sm\\:grid-cols-2 > div');
      if (triageTiles.length) staggerList(triageTiles, 'fade-up', 70, 4);

      const rightCards = triageGrid.querySelectorAll('.lg\\:col-span-5 > div');
      if (rightCards.length) staggerList(rightCards, 'fade-left', 100, 2);
    }

    // Standard split columns inside sections
    const splitGrids = section.querySelectorAll('.container > .grid.lg\\:grid-cols-12, .container > .grid.md\\:grid-cols-2, .container > .grid.lg\\:grid-cols-2');
    splitGrids.forEach(grid => {
      const cols = Array.from(grid.children).filter(child => child.nodeType === 1);
      if (cols.length !== 2) return;
      animateSplitCol(cols[0], 'fade-right', 0);
      animateSplitCol(cols[1], 'fade-left', 90);
    });

    // Multi-card grids across all pages
    section.querySelectorAll('.grid').forEach(grid => {
      const gridCards = Array.from(grid.children).filter(el =>
        el.matches('.card-contrast-heroic, .card, .parts-card, article, .group.rounded-2xl, .group.rounded-3xl, .bg-slate-950.rounded-xl')
      );
      if (gridCards.length >= 2) {
        staggerList(gridCards, 'fade-up', 75, 6);
      }
    });

    // Pricing parts/policy 4-col grid cards
    const infoGrid4 = section.querySelectorAll('.grid.md\\:grid-cols-4 > div');
    if (infoGrid4.length) {
      staggerList(infoGrid4, 'fade-up', 75, 4);
    }

    // Spare-parts vehicle selector & search filter bars
    const filterBars = section.querySelectorAll('.container > .flex.rounded-2xl, .container > .flex-col.rounded-2xl, .container > .rounded-2xl.mb-8');
    if (filterBars.length) {
      staggerList(filterBars, 'fade-up', 0, 2);
    }

    // Accordions (Service details, Service FAQs, Pricing FAQs)
    const accordions = section.querySelectorAll('.accordion-item');
    if (accordions.length) {
      staggerList(accordions, 'fade-up', 60, 6);
    }

    // Comparison Tables, Before/After Sliders, Price Toggle Bar, Estimator Cards, Final Gradient CTA Banners
    section.querySelectorAll('.overflow-x-auto.rounded-2xl, .before-after-container, .max-w-md.mx-auto.rounded-2xl, .max-w-3xl.mx-auto.card-contrast-heroic, .bg-gradient-to-r.rounded-3xl').forEach(el => {
      registerTarget(el, 'zoom-in', 60);
    });

    // Standalone forms & ungrouped cards
    section.querySelectorAll('.card-contrast-heroic, .container > .card, form[data-enquiry-form], form[data-contact-form], form[data-booking-form]').forEach(el => {
      registerTarget(el, 'fade-up', 40);
    });

    // Final centered single-column CTA blocks
    const singleCtaWrap = section.querySelector(':scope > .container.text-center');
    if (singleCtaWrap) {
      registerTarget(singleCtaWrap, 'zoom-in', 50);
    }
  });

  // 5. Global Footer Staggered Columns
  const footer = document.querySelector('footer.site-footer');
  if (footer) {
    const footerCols = footer.querySelectorAll('.grid > div');
    staggerList(footerCols, 'fade-up', 70, 5);
    const footerBottom = footer.querySelector('.footer-bottom');
    if (footerBottom) registerTarget(footerBottom, 'fade-in', 140);
  }

  // 6. Setup IntersectionObserver + Above/In-Viewport Catchup
  const targets = Array.from(registered);
  if (!targets.length) return;

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target, false);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -36px 0px'
    });
  }

  const initialViewportTargets = [];
  const vh = window.innerHeight || document.documentElement.clientHeight;

  targets.forEach(el => {
    // Skip elements currently hidden by filter (will be revealed when shown)
    if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') {
      if (observer) observer.observe(el);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0) {
      // Already scrolled above the viewport: show immediately without animation delay
      revealElement(el, true);
    } else if (rect.top < vh * 0.96) {
      // Visible right on first load (Hero, Auth Card, etc.): stagger cleanly
      initialViewportTargets.push(el);
    } else if (observer) {
      observer.observe(el);
    } else {
      revealElement(el, true);
    }
  });

  if (initialViewportTargets.length) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        initialViewportTargets.forEach(el => revealElement(el, false));
      });
    });
  }
}
