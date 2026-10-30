/**
 * ACTINIUM FITNESS - Core JavaScript
 * Modern Vanilla JS with Accessible Modals, Client-side Form Validation,
 * Mobile Menu, Dynamic Pricing Toggle & Scroll Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initStatsCounter();
  initPricingToggle();
  initPlanSelection();
  initTrialModal();
  initContactForm();
  initProgramFilters();
  initCurrentYear();
});

/* ==========================================================================
   1. Mobile Navigation
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(isOpen) {
    const shouldOpen = typeof isOpen === 'boolean' ? isOpen : !toggleBtn.classList.contains('open');
    toggleBtn.classList.toggle('open', shouldOpen);
    navMenu.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(false);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Highlight active link based on current page path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. Sticky Header Elevation
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Animated Stat Counters
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number[data-count]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeOut * (target - start) + start);

          el.innerHTML = `${currentCount}<span>${suffix}</span>`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerHTML = `${target}<span>${suffix}</span>`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Membership Pricing Toggle (Monthly vs Annual)
   ========================================================================== */
function initPricingToggle() {
  const toggleBtn = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.label-monthly');
  const annualLabel = document.querySelector('.label-annual');
  const priceElements = document.querySelectorAll('.pricing-card .amount');
  const periodElements = document.querySelectorAll('.pricing-card .period');

  if (!toggleBtn || !priceElements.length) return;

  function updatePrices(isAnnual) {
    toggleBtn.classList.toggle('annual', isAnnual);
    toggleBtn.setAttribute('aria-checked', isAnnual);

    if (monthlyLabel && annualLabel) {
      monthlyLabel.classList.toggle('active', !isAnnual);
      annualLabel.classList.toggle('active', isAnnual);
    }

    priceElements.forEach(el => {
      const card = el.closest('.pricing-card');
      const monthly = card.getAttribute('data-monthly');
      const annual = card.getAttribute('data-annual');
      el.textContent = isAnnual ? annual : monthly;
    });

    periodElements.forEach(el => {
      el.textContent = isAnnual ? '/ month (billed yearly)' : '/ month';
    });
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyAnnual = toggleBtn.classList.contains('annual');
    updatePrices(!isCurrentlyAnnual);
  });

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => updatePrices(false));
  }
  if (annualLabel) {
    annualLabel.addEventListener('click', () => updatePrices(true));
  }
}

/* ==========================================================================
   5. Plan Selection Integration
   ========================================================================== */
function initPlanSelection() {
  const planButtons = document.querySelectorAll('[data-select-plan]');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-select-plan');
      sessionStorage.setItem('actinium_selected_plan', planName);
      
      // If we are not on contact.html, navigate there
      if (!window.location.pathname.includes('contact.html')) {
        window.location.href = `contact.html?plan=${encodeURIComponent(planName)}#membership-section`;
      } else {
        prefillContactPlan(planName);
      }
    });
  });

  // Check URL param or session storage on page load
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan') || sessionStorage.getItem('actinium_selected_plan');
  if (planParam) {
    prefillContactPlan(planParam);
  }
}

function prefillContactPlan(planName) {
  const select = document.getElementById('preferred-plan');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(planName.toLowerCase()) || 
          select.options[i].value.toLowerCase().includes(planName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

/* ==========================================================================
   6. Free Trial Booking Modal & Client Validation
   ========================================================================== */
function initTrialModal() {
  const openButtons = document.querySelectorAll('[data-open-trial]');
  const dialog = document.getElementById('trial-modal');
  const closeBtn = document.getElementById('close-trial-modal');
  const trialForm = document.getElementById('trial-form');
  const confirmationMsg = document.getElementById('trial-confirmation');

  if (!dialog) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      if (trialForm) trialForm.style.display = 'block';
      if (confirmationMsg) confirmationMsg.style.display = 'none';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    });
  }

  // Light dismiss on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  // Trial form submission
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = trialForm.querySelector('#trial-name');
      const emailInput = trialForm.querySelector('#trial-email');
      const phoneInput = trialForm.querySelector('#trial-phone');

      let isValid = true;
      if (!nameInput.value.trim()) {
        highlightError(nameInput, true);
        isValid = false;
      } else {
        highlightError(nameInput, false);
      }

      if (!validateEmail(emailInput.value.trim())) {
        highlightError(emailInput, true);
        isValid = false;
      } else {
        highlightError(emailInput, false);
      }

      if (isValid) {
        // Show confirmation message
        trialForm.style.display = 'none';
        if (confirmationMsg) {
          confirmationMsg.style.display = 'block';
        }
        trialForm.reset();
      }
    });
  }
}

/* ==========================================================================
   7. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const responseBox = document.getElementById('contact-response-status');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#contact-name');
    const email = contactForm.querySelector('#contact-email');
    const phone = contactForm.querySelector('#contact-phone');
    const message = contactForm.querySelector('#contact-message');

    let isValid = true;

    if (!name || !name.value.trim()) {
      highlightError(name, true);
      isValid = false;
    } else {
      highlightError(name, false);
    }

    if (!email || !validateEmail(email.value.trim())) {
      highlightError(email, true);
      isValid = false;
    } else {
      highlightError(email, false);
    }

    if (!message || !message.value.trim()) {
      highlightError(message, true);
      isValid = false;
    } else {
      highlightError(message, false);
    }

    if (isValid && responseBox) {
      responseBox.style.display = 'block';
      responseBox.innerHTML = `
        <div style="background: rgba(19, 145, 204, 0.12); border: 1px solid var(--logo-blue-bright); border-radius: var(--radius-sm); padding: 18px 20px; margin-top: 20px;">
          <h4 style="color: var(--logo-blue-bright); margin-bottom: 6px; font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Inquiry Received
          </h4>
          <p style="font-size: 0.875rem; color: var(--metallic-200); margin: 0; line-height: 1.6;">
            Thank you, <strong>${escapeHTML(name.value.trim())}</strong>. Your message has been received by our concierge team. We will respond within 24 hours.
          </p>
        </div>
      `;
      contactForm.reset();
    }
  });
}

function highlightError(inputElement, hasError) {
  if (!inputElement) return;
  const parent = inputElement.closest('.form-group');
  if (parent) {
    parent.classList.toggle('has-error', hasError);
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   8. Program Filter Tabs
   ========================================================================== */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('[data-category]');

  if (!filterBtns.length || !programCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. Footer Dynamic Year
   ========================================================================== */
function initCurrentYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}
