/**
 * Dreamscape - Dream Vacation Designer Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Application State ---
  const state = {
    selectedDestinationId: 'bora-bora',
    selectedTierId: 'signature',
    selectedAddOns: new Set(['yacht', 'michelin']),
    selectedFlightClass: 'business',
    adults: 2,
    children: 0,
    durationDays: 7,
    departureDate: getNextMonthDate(),
    currency: localStorage.getItem('dreamscape_currency') || 'INR',
    currentVibeFilter: 'all',
    searchQuery: '',
    wishlist: loadWishlist(),
    theme: localStorage.getItem('dreamscape_theme') || 'dark'
  };

  // --- Initialize Application ---
  applyTheme(state.theme);
  initHeaderScroll();
  initThemeToggle();
  initCurrencySelector();
  initAmbientBackdrop();
  initRotatingHeroWords();
  initHeroFilterBar();
  initWishlistDrawer();
  initModals();
  initLogisticsControls();

  // Render initial components
  renderDestinations();
  renderDestinationThumbnails();
  renderTierCards();
  renderAddOnCards();
  renderItinerary();
  updateTripSummary();
  updateWishlistBadge();

  // --- Helper Date Function ---
  function getNextMonthDate() {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  }

  // --- Theme Management ---
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dreamscape_theme', theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }
  }

  // --- Header Scrolled State ---
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Currency Conversion & Formatting ---
  function formatCurrency(usdAmount, currencyKey = state.currency) {
    const curr = VACATION_DATA.currencies[currencyKey] || VACATION_DATA.currencies.INR || VACATION_DATA.currencies.USD;
    const converted = usdAmount * curr.rate;
    const locale = currencyKey === 'INR' ? 'en-IN' : 'en-US';

    return curr.symbol + Math.round(converted).toLocaleString(locale);
  }

  function setCurrency(newCurrency) {
    if (!VACATION_DATA.currencies[newCurrency]) return;
    state.currency = newCurrency;
    localStorage.setItem('dreamscape_currency', newCurrency);

    // Sync header select element
    const selector = document.getElementById('currency-selector');
    if (selector && selector.value !== newCurrency) {
      selector.value = newCurrency;
    }

    // Sync all quick-currency pill buttons across the page
    document.querySelectorAll('.curr-pill').forEach(pill => {
      if (pill.dataset.currency === newCurrency) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Re-render all pricing UI elements
    renderDestinations();
    renderTierCards();
    renderAddOnCards();
    updateTripSummary();
    renderWishlistDrawer();
  }

  function initCurrencySelector() {
    const selector = document.getElementById('currency-selector');
    if (selector) {
      selector.value = state.currency;
      selector.addEventListener('change', (e) => {
        setCurrency(e.target.value);
      });
    }

    // Attach click listeners to all quick currency pill buttons
    document.querySelectorAll('.curr-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const targetCurr = e.currentTarget.dataset.currency;
        if (targetCurr) {
          setCurrency(targetCurr);
        }
      });
    });

    // Initial pill activation
    document.querySelectorAll('.curr-pill').forEach(pill => {
      if (pill.dataset.currency === state.currency) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --- Soothing Ambient Backdrop Management ---
  let activeAmbientLayer = 'a';
  let userSelectedDestination = false;

  function initAmbientBackdrop() {
    const dest = VACATION_DATA.destinations.find(d => d.id === state.selectedDestinationId) || VACATION_DATA.destinations[0];
    const layerA = document.getElementById('ambient-layer-a');
    const layerB = document.getElementById('ambient-layer-b');
    const indicatorName = document.getElementById('ambient-dest-name');

    if (layerA) {
      layerA.style.backgroundImage = `url('${dest.image}')`;
      layerA.classList.add('active');
    }
    if (layerB) {
      layerB.classList.remove('active');
    }
    if (indicatorName) {
      indicatorName.textContent = dest.name;
    }
  }

  function updateAmbientBackdrop(dest) {
    if (!dest) return;
    const layerA = document.getElementById('ambient-layer-a');
    const layerB = document.getElementById('ambient-layer-b');
    const indicatorName = document.getElementById('ambient-dest-name');
    const heroBackdrop = document.getElementById('hero-backdrop');
    const heroWord = document.getElementById('hero-rotating-word');

    // Smooth dual-layer cross-fade
    if (activeAmbientLayer === 'a') {
      if (layerB) {
        layerB.style.backgroundImage = `url('${dest.image}')`;
        layerB.classList.add('active');
      }
      if (layerA) layerA.classList.remove('active');
      activeAmbientLayer = 'b';
    } else {
      if (layerA) {
        layerA.style.backgroundImage = `url('${dest.image}')`;
        layerA.classList.add('active');
      }
      if (layerB) layerB.classList.remove('active');
      activeAmbientLayer = 'a';
    }

    // Update floating indicator badge
    if (indicatorName) {
      indicatorName.textContent = dest.name;
    }

    // Update hero backdrop and rotating title smoothly
    if (heroBackdrop) {
      heroBackdrop.style.backgroundImage = `url('${dest.image}')`;
    }
    if (heroWord) {
      heroWord.style.opacity = '0';
      setTimeout(() => {
        heroWord.textContent = dest.name;
        heroWord.style.opacity = '1';
      }, 200);
    }
  }

  // --- Hero Section Dynamic Rotating Words & Backgrounds ---
  function initRotatingHeroWords() {
    const rotatingEl = document.getElementById('hero-rotating-word');
    const backdropEl = document.getElementById('hero-backdrop');
    if (!rotatingEl) return;

    const destinations = VACATION_DATA.destinations;
    let currentIndex = 0;

    // Set initial backdrop
    if (backdropEl) {
      backdropEl.style.backgroundImage = `url('${destinations[0].image}')`;
    }

    setInterval(() => {
      // If user has explicitly selected a destination, keep that dream backdrop in place!
      if (userSelectedDestination) return;

      currentIndex = (currentIndex + 1) % destinations.length;
      const dest = destinations[currentIndex];

      rotatingEl.style.opacity = '0';
      setTimeout(() => {
        rotatingEl.textContent = dest.name;
        rotatingEl.style.opacity = '1';
        if (backdropEl) {
          backdropEl.style.backgroundImage = `url('${dest.image}')`;
        }
        updateAmbientBackdrop(dest);
      }, 400);
    }, 5500);
  }

  // --- Hero Filter Bar ---
  function initHeroFilterBar() {
    const heroFilterBtn = document.getElementById('hero-filter-btn');
    const vibeSelect = document.getElementById('hero-vibe-select');
    const durationSelect = document.getElementById('hero-duration-select');
    const tierSelect = document.getElementById('hero-tier-select');

    if (heroFilterBtn) {
      heroFilterBtn.addEventListener('click', () => {
        if (vibeSelect) state.currentVibeFilter = vibeSelect.value;
        if (durationSelect) state.durationDays = parseInt(durationSelect.value, 10);
        if (tierSelect) {
          state.selectedTierId = tierSelect.value;
          renderTierCards();
        }

        // Sync vibe tabs
        document.querySelectorAll('.vibe-tab').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.vibe === state.currentVibeFilter);
        });

        renderDestinations();
        updateTripSummary();

        // Smooth scroll to destinations section
        const destSection = document.getElementById('destinations');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Hero quick pills
    document.querySelectorAll('.hero-dest-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        selectDestination(destId);
        const plannerSection = document.getElementById('planner');
        if (plannerSection) {
          plannerSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // --- Render Destinations Showcase ---
  function renderDestinations() {
    const container = document.getElementById('destinations-grid');
    if (!container) return;

    const filtered = VACATION_DATA.destinations.filter(dest => {
      const matchesVibe = state.currentVibeFilter === 'all' || dest.vibe === state.currentVibeFilter;
      const query = state.searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        dest.name.toLowerCase().includes(query) ||
        dest.country.toLowerCase().includes(query) ||
        dest.tagline.toLowerCase().includes(query) ||
        dest.highlights.some(h => h.toLowerCase().includes(query));
      return matchesVibe && matchesQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">🏝️</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">No dream escapes found</h3>
          <p style="color: var(--text-muted);">Try adjusting your filter or search keywords.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(dest => {
      const isSelected = dest.id === state.selectedDestinationId;
      const isWishlisted = state.wishlist.includes(dest.id);
      const formattedPrice = formatCurrency(dest.basePriceUSD);

      return `
        <article class="destination-card ${isSelected ? 'active-selected' : ''}" data-id="${dest.id}">
          <div class="dest-img-container">
            <img src="${dest.image}" alt="${dest.name}" class="dest-img" loading="lazy">
            <span class="dest-badge">${dest.badge}</span>
            <button class="dest-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-dest-id="${dest.id}" 
                    aria-label="Save to Wishlist" 
                    title="Save to Wishlist">
              ${isWishlisted ? '♥' : '♡'}
            </button>
            <div class="dest-overlay-gradient"></div>
            <div class="dest-quick-stats">
              <div class="dest-rating">★ <span>${dest.rating}</span> <span style="font-size: 0.76rem; color: #94a3b8;">(${dest.reviewCount})</span></div>
              <div class="dest-duration">⏱ ${dest.durationDays} Days / ${dest.durationDays - 1} Nights</div>
            </div>
          </div>

          <div class="dest-body">
            <div class="dest-header-info">
              <span class="dest-vibe-pill">${dest.vibeLabel}</span>
              <h3 class="dest-title">${dest.name}</h3>
              <div class="dest-location">📍 ${dest.country} · ${dest.region}</div>
            </div>

            <p class="dest-tagline">${dest.tagline}</p>

            <div class="dest-perks-list">
              ${dest.highlights.slice(0, 3).map(h => `
                <div class="dest-perk-item">
                  <span class="icon">✦</span>
                  <span>${h}</span>
                </div>
              `).join('')}
            </div>

            <div class="dest-footer">
              <div class="dest-price-box">
                <span class="dest-price-label">Starting From</span>
                <span class="dest-price-val">${formattedPrice} <span style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted);">/ person</span></span>
              </div>
              <div class="dest-actions">
                <button class="btn btn-secondary btn-sm dest-view-details-btn" data-dest-id="${dest.id}">Details</button>
                <button class="btn btn-primary btn-sm dest-select-btn" data-dest-id="${dest.id}">
                  ${isSelected ? 'Selected ✓' : 'Plan Trip →'}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach event listeners to card buttons
    attachDestinationCardEvents();
  }

  function attachDestinationCardEvents() {
    // Select button
    document.querySelectorAll('.dest-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        selectDestination(destId);
        const plannerSection = document.getElementById('planner');
        if (plannerSection) {
          plannerSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // View Details button
    document.querySelectorAll('.dest-view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        openDestinationDetailModal(destId);
      });
    });

    // Wishlist heart button
    document.querySelectorAll('.dest-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const destId = e.currentTarget.dataset.destId;
        toggleWishlist(destId);
      });
    });
  }

  // --- Vibe Filter Tabs & Search Box ---
  document.querySelectorAll('.vibe-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.vibe-tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.currentVibeFilter = e.currentTarget.dataset.vibe;
      renderDestinations();
    });
  });

  const searchInput = document.getElementById('dest-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderDestinations();
    });
  }

  // --- Destination Selection Handler ---
  function selectDestination(destId) {
    userSelectedDestination = true;
    state.selectedDestinationId = destId;
    const dest = VACATION_DATA.destinations.find(d => d.id === destId);
    if (dest) {
      state.durationDays = dest.durationDays;
      const durationInput = document.getElementById('logistics-duration');
      if (durationInput) durationInput.value = dest.durationDays;

      // Update ambient atmospheric background soothingly across the page
      updateAmbientBackdrop(dest);
    }

    renderDestinations();
    renderDestinationThumbnails();
    renderItinerary();
    updateTripSummary();
  }

  // --- Step 1: Destination Selection Thumbnails ---
  function renderDestinationThumbnails() {
    const container = document.getElementById('dest-selector-slider');
    if (!container) return;

    container.innerHTML = VACATION_DATA.destinations.map(dest => {
      const isSelected = dest.id === state.selectedDestinationId;
      return `
        <div class="dest-select-thumb ${isSelected ? 'active' : ''}" data-dest-id="${dest.id}">
          <img src="${dest.image}" alt="${dest.name}" class="dest-thumb-img">
          <div class="dest-thumb-name">${dest.name}</div>
          <div class="dest-thumb-country">${dest.country}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.dest-select-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        selectDestination(destId);
      });
    });
  }

  // --- Step 2: Travel Tier / Plan Style Cards ---
  function renderTierCards() {
    const container = document.getElementById('tier-cards-container');
    if (!container) return;

    const currentDest = VACATION_DATA.destinations.find(d => d.id === state.selectedDestinationId);
    const basePrice = currentDest ? currentDest.basePriceUSD : 5000;

    container.innerHTML = VACATION_DATA.tiers.map(tier => {
      const isSelected = tier.id === state.selectedTierId;
      const estimatedPricePerPerson = formatCurrency(Math.round(basePrice * tier.multiplier));

      return `
        <div class="tier-card ${isSelected ? 'selected' : ''}" data-tier-id="${tier.id}">
          ${tier.isPopular ? `<span class="tier-badge">Recommended</span>` : ''}
          <h4 class="tier-title">${tier.name}</h4>
          <p class="tier-tagline">${tier.tagline}</p>
          <div class="tier-multiplier-badge">Est. ${estimatedPricePerPerson} / person</div>
          <ul class="tier-features-list">
            ${tier.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.tier-card').forEach(card => {
      card.addEventListener('click', (e) => {
        state.selectedTierId = e.currentTarget.dataset.tierId;
        renderTierCards();
        updateTripSummary();
      });
    });
  }

  // --- Step 3: Experiential Add-ons Multi-Select ---
  function renderAddOnCards() {
    const container = document.getElementById('addons-grid');
    if (!container) return;

    container.innerHTML = VACATION_DATA.addOns.map(addon => {
      const isSelected = state.selectedAddOns.has(addon.id);
      const formattedPrice = formatCurrency(addon.priceUSD);

      return `
        <div class="addon-card ${isSelected ? 'selected' : ''}" data-addon-id="${addon.id}">
          <div class="addon-checkbox">
            ${isSelected ? '✓' : ''}
          </div>
          <div class="addon-info">
            <div class="addon-name-row">
              <span class="addon-title">${addon.icon} ${addon.name}</span>
              <span class="addon-price">+${formattedPrice}</span>
            </div>
            <p class="addon-desc">${addon.desc}</p>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.addon-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const addonId = e.currentTarget.dataset.addonId;
        if (state.selectedAddOns.has(addonId)) {
          state.selectedAddOns.delete(addonId);
        } else {
          state.selectedAddOns.add(addonId);
        }
        renderAddOnCards();
        updateTripSummary();
      });
    });
  }

  // --- Step 4: Trip Logistics Controls ---
  function initLogisticsControls() {
    // Adults counter
    const adultsVal = document.getElementById('adults-val');
    const adultsDec = document.getElementById('adults-dec');
    const adultsInc = document.getElementById('adults-inc');
    if (adultsDec && adultsInc && adultsVal) {
      adultsDec.addEventListener('click', () => {
        if (state.adults > 1) {
          state.adults--;
          adultsVal.textContent = state.adults;
          updateTripSummary();
        }
      });
      adultsInc.addEventListener('click', () => {
        if (state.adults < 12) {
          state.adults++;
          adultsVal.textContent = state.adults;
          updateTripSummary();
        }
      });
    }

    // Children counter
    const childrenVal = document.getElementById('children-val');
    const childrenDec = document.getElementById('children-dec');
    const childrenInc = document.getElementById('children-inc');
    if (childrenDec && childrenInc && childrenVal) {
      childrenDec.addEventListener('click', () => {
        if (state.children > 0) {
          state.children--;
          childrenVal.textContent = state.children;
          updateTripSummary();
        }
      });
      childrenInc.addEventListener('click', () => {
        if (state.children < 8) {
          state.children++;
          childrenVal.textContent = state.children;
          updateTripSummary();
        }
      });
    }

    // Duration days
    const durationInput = document.getElementById('logistics-duration');
    if (durationInput) {
      durationInput.value = state.durationDays;
      durationInput.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        if (val >= 4 && val <= 30) {
          state.durationDays = val;
          updateTripSummary();
        }
      });
    }

    // Departure date
    const dateInput = document.getElementById('logistics-date');
    if (dateInput) {
      dateInput.value = state.departureDate;
      dateInput.min = new Date().toISOString().split('T')[0];
      dateInput.addEventListener('change', (e) => {
        state.departureDate = e.target.value;
        updateTripSummary();
      });
    }

    // Flight Class selector
    const flightSelect = document.getElementById('logistics-flight-class');
    if (flightSelect) {
      flightSelect.value = state.selectedFlightClass;
      flightSelect.addEventListener('change', (e) => {
        state.selectedFlightClass = e.target.value;
        updateTripSummary();
      });
    }
  }

  // --- Real-time Price Calculation & Sticky Summary ---
  function calculatePricing() {
    const dest = VACATION_DATA.destinations.find(d => d.id === state.selectedDestinationId) || VACATION_DATA.destinations[0];
    const tier = VACATION_DATA.tiers.find(t => t.id === state.selectedTierId) || VACATION_DATA.tiers[1];
    const flight = VACATION_DATA.flightClasses.find(f => f.id === state.selectedFlightClass) || VACATION_DATA.flightClasses[1];

    // Duration adjustment factor
    const baseDuration = dest.durationDays;
    const durationFactor = state.durationDays / baseDuration;

    // Per-person base rate with tier and duration
    const perAdultBase = (dest.basePriceUSD * tier.multiplier * durationFactor) + flight.priceMultiplier;
    const perChildBase = perAdultBase * 0.65; // 35% discount for child

    const basePartyTotal = (perAdultBase * state.adults) + (perChildBase * state.children);

    // Experiential add-ons total
    let addOnsTotal = 0;
    state.selectedAddOns.forEach(addonId => {
      const addon = VACATION_DATA.addOns.find(a => a.id === addonId);
      if (addon) {
        // Some add-ons scale with adults (helicopter, tastings, spa)
        addOnsTotal += addon.priceUSD * (state.adults);
      }
    });

    const grandTotalUSD = Math.round(basePartyTotal + addOnsTotal);
    const totalTravelers = state.adults + state.children;
    const perPersonAverageUSD = Math.round(grandTotalUSD / (totalTravelers || 1));

    return {
      dest,
      tier,
      flight,
      basePartyTotal,
      addOnsTotal,
      grandTotalUSD,
      perPersonAverageUSD,
      totalTravelers
    };
  }

  function updateTripSummary() {
    const pricing = calculatePricing();
    const { dest, tier, flight, addOnsTotal, grandTotalUSD, perPersonAverageUSD, totalTravelers } = pricing;

    // Update summary preview image and destination title
    const sumDestName = document.getElementById('summary-dest-name');
    const sumDestImg = document.getElementById('summary-preview-img');
    const sumTierName = document.getElementById('summary-tier-name');
    const sumDuration = document.getElementById('summary-duration');
    const sumTravelers = document.getElementById('summary-travelers');
    const sumFlight = document.getElementById('summary-flight');
    const sumAddonsCount = document.getElementById('summary-addons-count');
    const sumAddonsVal = document.getElementById('summary-addons-val');
    const sumBaseVal = document.getElementById('summary-base-val');
    const sumTotalVal = document.getElementById('summary-total-val');
    const sumPerPersonVal = document.getElementById('summary-per-person-val');

    if (sumDestName) sumDestName.textContent = `${dest.name}, ${dest.country}`;
    if (sumDestImg) {
      sumDestImg.src = dest.image;
      sumDestImg.alt = dest.name;
    }
    if (sumTierName) sumTierName.textContent = tier.name;
    if (sumDuration) sumDuration.textContent = `${state.durationDays} Days / ${state.durationDays - 1} Nights`;
    if (sumTravelers) {
      const travelerStr = `${state.adults} Adult${state.adults > 1 ? 's' : ''}` +
        (state.children > 0 ? `, ${state.children} Child${state.children > 1 ? 'ren' : ''}` : '');
      sumTravelers.textContent = travelerStr;
    }
    if (sumFlight) sumFlight.textContent = flight.name;
    if (sumAddonsCount) sumAddonsCount.textContent = `${state.selectedAddOns.size} Selected`;
    if (sumAddonsVal) sumAddonsVal.textContent = formatCurrency(addOnsTotal);
    if (sumBaseVal) sumBaseVal.textContent = formatCurrency(pricing.basePartyTotal);
    if (sumTotalVal) sumTotalVal.textContent = formatCurrency(grandTotalUSD);
    if (sumPerPersonVal) sumPerPersonVal.textContent = `${formatCurrency(perPersonAverageUSD)} avg. / traveler`;
  }

  // --- Dynamic Day-by-Day Itinerary Explorer ---
  function renderItinerary() {
    const container = document.getElementById('itinerary-timeline');
    const headerTitle = document.getElementById('itinerary-dest-title');
    const headerDesc = document.getElementById('itinerary-dest-desc');
    if (!container) return;

    const dest = VACATION_DATA.destinations.find(d => d.id === state.selectedDestinationId) || VACATION_DATA.destinations[0];
    const days = VACATION_DATA.itineraries[dest.id] || VACATION_DATA.itineraries['bora-bora'];

    if (headerTitle) headerTitle.textContent = `${dest.name} Signature Experience`;
    if (headerDesc) headerDesc.textContent = `Explore the hand-crafted day-by-day journey curated specifically for ${dest.name} under our ${VACATION_DATA.tiers.find(t => t.id === state.selectedTierId)?.name || 'Signature Luxury'} tier.`;

    container.innerHTML = days.map((dayItem, index) => {
      return `
        <div class="itinerary-day-card">
          <div class="itinerary-day-badge">
            <span class="day-num">${index + 1}</span>
            <span class="day-sub">Day</span>
          </div>

          <div class="itinerary-day-content">
            <h4 class="itinerary-day-title">${dayItem.title}</h4>
            <p class="itinerary-day-desc">${dayItem.desc}</p>
            <div class="itinerary-day-meta">
              <span class="itinerary-stay-pill">🏨 Stay: ${dayItem.stay}</span>
              <div class="itinerary-tags-row">
                ${dayItem.tags.map(tag => `<span class="itinerary-tag">#${tag}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Wishlist Management ---
  function loadWishlist() {
    try {
      const saved = localStorage.getItem('dreamscape_wishlist');
      return saved ? JSON.parse(saved) : ['bora-bora', 'kyoto'];
    } catch {
      return ['bora-bora', 'kyoto'];
    }
  }

  function saveWishlist() {
    localStorage.setItem('dreamscape_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
    renderWishlistDrawer();
  }

  function toggleWishlist(destId) {
    const index = state.wishlist.indexOf(destId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
    } else {
      state.wishlist.push(destId);
    }
    saveWishlist();
    renderDestinations();
  }

  function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count-badge');
    if (badge) {
      badge.textContent = state.wishlist.length;
      badge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
    }
  }

  function initWishlistDrawer() {
    const openBtn = document.getElementById('open-wishlist-btn');
    const closeBtn = document.getElementById('close-wishlist-btn');
    const backdrop = document.getElementById('wishlist-backdrop');
    const panel = document.getElementById('wishlist-panel');

    function openDrawer() {
      renderWishlistDrawer();
      if (backdrop) backdrop.classList.add('active');
      if (panel) panel.classList.add('active');
    }

    function closeDrawer() {
      if (backdrop) backdrop.classList.remove('active');
      if (panel) panel.classList.remove('active');
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }

  function renderWishlistDrawer() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    if (state.wishlist.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🤍</div>
          <p style="font-size: 0.95rem;">Your dream wishlist is currently empty.</p>
          <p style="font-size: 0.8rem; margin-top: 6px;">Click the heart icon on any destination card to save your favorites.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = state.wishlist.map(destId => {
      const dest = VACATION_DATA.destinations.find(d => d.id === destId);
      if (!dest) return '';
      const priceStr = formatCurrency(dest.basePriceUSD);

      return `
        <div class="wishlist-item-card">
          <img src="${dest.image}" alt="${dest.name}" class="wishlist-item-img">
          <div class="wishlist-item-info">
            <h5 class="wishlist-item-name">${dest.name}</h5>
            <div style="font-size: 0.78rem; color: var(--text-muted);">📍 ${dest.country}</div>
            <div class="wishlist-item-price">From ${priceStr}</div>
            <button class="btn btn-primary btn-sm load-wishlist-item-btn" data-dest-id="${dest.id}" style="margin-top: 8px; padding: 4px 14px; font-size: 0.76rem;">
              Plan This Destination →
            </button>
          </div>
          <button class="wishlist-remove-btn" data-dest-id="${dest.id}" title="Remove from wishlist">✕</button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.load-wishlist-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        selectDestination(destId);
        document.getElementById('wishlist-backdrop')?.classList.remove('active');
        document.getElementById('wishlist-panel')?.classList.remove('active');
        document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    container.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const destId = e.currentTarget.dataset.destId;
        toggleWishlist(destId);
      });
    });
  }

  // --- Modals: Destination Details & Booking Concierge ---
  function initModals() {
    // Close modal on backdrop or close button
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeAllModals();
        }
      });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        closeAllModals();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });

    // Plan Consultation / Book button in summary
    const bookBtn = document.getElementById('summary-book-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', openBookingConciergeModal);
    }

    // Save Wishlist in summary
    const saveWishlistSummaryBtn = document.getElementById('summary-save-wishlist-btn');
    if (saveWishlistSummaryBtn) {
      saveWishlistSummaryBtn.addEventListener('click', () => {
        if (!state.wishlist.includes(state.selectedDestinationId)) {
          state.wishlist.push(state.selectedDestinationId);
          saveWishlist();
          renderDestinations();
        }
        alert('✨ Dream itinerary configuration saved to your Wishlist!');
      });
    }

    // Booking form submit
    const bookingForm = document.getElementById('concierge-booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', handleBookingSubmit);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
  }

  function openDestinationDetailModal(destId) {
    const dest = VACATION_DATA.destinations.find(d => d.id === destId);
    if (!dest) return;

    const modal = document.getElementById('dest-detail-modal');
    if (!modal) return;

    const contentBox = document.getElementById('dest-detail-content');
    if (contentBox) {
      contentBox.innerHTML = `
        <div style="position: relative; height: 280px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px;">
          <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          
          <!-- Explicit Back Out button brought forward in front of the image -->
          <button type="button" class="dest-banner-back-btn modal-close-btn-inline" aria-label="Back to Destinations" title="Back to Destinations">
            <span>←</span> Back to Destinations
          </button>

          <!-- Top-right circular close button in front of image -->

          <div style="position: absolute; bottom: 16px; left: 20px; z-index: 2;">
            <span class="dest-badge" style="position: static; margin-bottom: 6px; display: inline-block;">${dest.badge}</span>
            <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #fff;">${dest.name}</h2>
            <div style="color: #cbd5e1; font-size: 0.9rem;">📍 ${dest.country} · ${dest.region}</div>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7, 9, 14, 0.5) 0%, transparent 40%, rgba(7, 9, 14, 0.95) 100%);"></div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 24px;">
          ${dest.description}
        </p>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 28px; background: rgba(212, 175, 55, 0.05); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--gold-border);">
          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700;">Best Season</div>
            <div style="font-size: 0.9rem; font-weight: 600;">${dest.season}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700;">Average Climate</div>
            <div style="font-size: 0.9rem; font-weight: 600;">${dest.weather}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700;">Transit & Access</div>
            <div style="font-size: 0.9rem; font-weight: 600;">${dest.flightHub}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700;">Base Experience</div>
            <div style="font-size: 0.9rem; font-weight: 600;">${formatCurrency(dest.basePriceUSD)} (${dest.durationDays} Days)</div>
          </div>
        </div>

        <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 12px; color: var(--text-primary);">Signature Inclusions & Perks</h4>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 30px;">
          ${dest.includedPerks.map(perk => `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-secondary);">
              <span style="color: var(--gold-primary); font-size: 1rem;">✦</span>
              <span>${perk}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid rgba(212, 175, 55, 0.15); padding-top: 20px; margin-top: 20px;">
          <button class="btn btn-secondary modal-close-btn-inline" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>←</span> Back to Destinations
          </button>
          <button class="btn btn-primary" id="modal-select-this-dest" data-dest-id="${dest.id}">
            Select & Customize This Trip →
          </button>
        </div>
      `;

      contentBox.querySelectorAll('.modal-close-btn-inline').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
      });
      contentBox.querySelector('#modal-select-this-dest')?.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.destId;
        closeAllModals();
        selectDestination(id);
        document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openBookingConciergeModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const pricing = calculatePricing();
    const recapBox = document.getElementById('booking-summary-recap');
    if (recapBox) {
      recapBox.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: center; background: rgba(212, 175, 55, 0.08); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--gold-border); margin-bottom: 20px;">
          <img src="${pricing.dest.image}" style="width: 80px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;">
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary);">${pricing.dest.name}, ${pricing.dest.country}</h4>
            <div style="font-size: 0.82rem; color: var(--gold-light);">${pricing.tier.name} · ${state.durationDays} Days · ${pricing.totalTravelers} Traveler${pricing.totalTravelers > 1 ? 's' : ''}</div>
          </div>
          <div style="margin-left: auto; text-align: right;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted);">Estimated Total</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-light);">${formatCurrency(pricing.grandTotalUSD)}</div>
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    const modalContent = document.getElementById('booking-modal-body');
    const pricing = calculatePricing();
    const refCode = 'AV-2026-' + Math.floor(1000 + Math.random() * 9000);

    // Launch celebratory confetti
    triggerLuxuryConfetti();

    if (modalContent) {
      modalContent.innerHTML = `
        <div style="text-align: center; padding: 24px 10px;">
          <div style="width: 72px; height: 72px; background: var(--gold-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #0c1017; margin: 0 auto 20px auto; box-shadow: 0 0 30px var(--gold-glow);">
            ✓
          </div>
          <span class="section-label">Reservation Request Confirmed</span>
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-primary); margin-bottom: 12px;">Your Extraordinary Journey Awaits</h2>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px auto; line-height: 1.6;">
            A senior Dreamscape private travel designer has been assigned to your journey to ${pricing.dest.name}. We will reach out within 2 hours to finalize your bespoke itinerary.
          </p>

          <div style="background: rgba(15, 23, 38, 0.6); border: 1px solid var(--gold-border); border-radius: var(--radius-md); padding: 20px; max-width: 440px; margin: 0 auto 30px auto; text-align: left;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Expedition Dossier:</span>
              <strong style="color: var(--gold-light); font-family: monospace; font-size: 1rem;">${refCode}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Destination:</span>
              <strong style="color: var(--text-primary);">${pricing.dest.name}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Plan Tier:</span>
              <strong style="color: var(--gold-primary);">${pricing.tier.name}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Estimated Investment:</span>
              <strong style="color: var(--gold-light); font-size: 1.1rem;">${formatCurrency(pricing.grandTotalUSD)}</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px;">
            <button class="btn btn-secondary" onclick="window.print()">🖨️ Print / Save PDF</button>
            <button class="btn btn-primary" onclick="location.reload()">Design Another Escape</button>
          </div>
        </div>
      `;
    }
  }

  // --- Luxury Confetti Animation ---
  function triggerLuxuryConfetti() {
    const canvas = document.getElementById('celebration-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#e2b874', '#f5dfb2', '#b88b42', '#ffffff', '#00d2ff', '#f43f5e'];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        gravity: 0.28
      });
    }

    let animationFrameId;

    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.007;

        if (p.alpha > 0) {
          activeParticles++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
      }
    }

    renderConfetti();
  }

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(7, 9, 14, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--gold-border)';
      }
    });
  }
});
