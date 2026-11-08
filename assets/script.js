/* ==========================================================================
   Wild Safari - GLOBAL JAVASCRIPT (assets/script.js)
   Connected to Local PC PHP Server + Automatic Global Success Popup Modal
   ========================================================================== */

function acsReportConversion() {
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      send_to: 'AW-18551133495/cM0RCI-6rrAdELeq741F',
      value: 1.0,
      currency: 'INR'
    });
  }
}

const SITE_CONFIG = {
  backendUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/process-form.php' 
    : 'https://form.wildsafariexpert.online/process-form.php',
  email: 'adventuresafari120@gmail.com',
  phone: '+91-7457046323',
  whatsappPhone: '917457046323',
  slideIntervalMs: 5000
};

document.addEventListener('DOMContentLoaded', () => {

  // 0. Sync Sticky Topbar Height
  const topbar = document.querySelector('.topbar');
  const syncTopbarHeight = () => {
    if (topbar) {
      const h = topbar.offsetHeight || 38;
      document.documentElement.style.setProperty('--acs-topbar-height', `${h}px`);
    }
  };
  syncTopbarHeight();
  window.addEventListener('resize', syncTopbarHeight, { passive: true });

  // 1. Robust Active Nav Highlighting
  const nav = document.querySelector('.nav-links');
  if (nav) {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const cleanPath = rawPath.split('?')[0].split('#')[0] || 'index.html';
    const isHome = cleanPath === '' || cleanPath === 'index.html';
    const navAnchors = nav.querySelectorAll('a');

    navAnchors.forEach(link => {
      const href = (link.getAttribute('href') || '').trim();
      const isHomeLink =
        href === 'index.html' ||
        href === './' ||
        href === '/' ||
        href === 'https://wildsafariexpert.online' ||
        href === 'https://wildsafariexpert.online/';

      if ((isHome && isHomeLink) || (!isHome && href === cleanPath)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }

  // 3. Resilient Hero Slider
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.hero-dots button')];

  if (slides.length > 0 && dots.length > 0) {
    let currentIndex = 0;
    let timerId = null;

    const showSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, idx) => slide.classList.toggle('active', idx === currentIndex));
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
    };

    const startAutoSlide = () => {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => showSlide(currentIndex + 1), SITE_CONFIG.slideIntervalMs);
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startAutoSlide();
      });
    });

    startAutoSlide();
  }

  // 4. Global Success Popup Modal Injection (Har page ke liye)
  if (!document.getElementById('acsGlobalSuccessModal')) {
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .acs-modal[hidden] { display: none !important; }
      .acs-modal {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        padding: 18px; background: rgba(7, 23, 15, .76);
        backdrop-filter: blur(5px);
      }
      .acs-dialog {
        width: min(100%, 480px); padding: 32px 26px 25px;
        border-radius: 16px; background: #fff; color: #1c2922;
        text-align: center; box-shadow: 0 22px 70px rgba(0,0,0,.3);
      }
      .acs-check {
        width: 62px; height: 62px; margin: 0 auto 15px;
        display: grid; place-items: center; border-radius: 50%;
        background: #e5f6eb; color: #168344; font-size: 34px; font-weight: 800;
      }
      .acs-dialog h2 {
        margin: 0 0 10px; color: #173d2b; font-size: 25px; line-height: 1.25;
      }
      .acs-dialog p {
        margin: 0 auto 17px; color: #526158; font-size: 14.5px; line-height: 1.7;
      }
      .acs-details {
        margin: 0 0 20px; padding: 13px 15px; border-radius: 9px;
        background: #f1f6f2; text-align: left; overflow-wrap: anywhere;
        color: #263c2e; font-size: 14px; line-height: 1.8;
      }
      .acs-details strong { color: #173d2b; }
      .acs-close {
        width: 100%; border: 0; border-radius: 8px; padding: 13px 16px;
        background: #173d2b; color: #fff; font: inherit; font-weight: 750;
        cursor: pointer;
      }
      .acs-close:hover { background: #24583d; }
    `;
    document.head.appendChild(modalStyle);

    const modalHtml = `
      <div class="acs-modal" id="acsGlobalSuccessModal" hidden role="dialog" aria-modal="true">
        <div class="acs-dialog">
          <div class="acs-check" aria-hidden="true">✓</div>
          <h2>Thanks for connecting with us!</h2>
          <p>Your safari enquiry has been emailed to our desk. Our team will contact you shortly at:</p>
          <div class="acs-details">
            <div><strong>Phone:</strong> <span id="acsGlobalModalPhone"></span></div>
            <div><strong>Email:</strong> <span id="acsGlobalModalEmail"></span></div>
          </div>
          <button type="button" class="acs-close" id="acsGlobalModalClose">Close</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  const globalModal = document.getElementById('acsGlobalSuccessModal');
  const globalCloseBtn = document.getElementById('acsGlobalModalClose');

  const openGlobalPopup = (phone, email) => {
    document.getElementById('acsGlobalModalPhone').textContent = phone;
    document.getElementById('acsGlobalModalEmail').textContent = email;
    globalModal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeGlobalPopup = () => {
    globalModal.hidden = true;
    document.body.style.overflow = '';
  };

  if (globalCloseBtn && globalModal) {
    globalCloseBtn.addEventListener('click', closeGlobalPopup);
    globalModal.addEventListener('click', (e) => {
      if (e.target === globalModal) closeGlobalPopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !globalModal.hidden) closeGlobalPopup();
    });
  }

  // 5. Direct Local PC Lead Handler for [data-enquiry-form]
  document.querySelectorAll('[data-enquiry-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const feedback = form.parentElement.querySelector('.form-feedback');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Enquiry';

      if (feedback) feedback.style.display = 'none';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      const formData = new FormData(form);
      const dataObj = Object.fromEntries(formData.entries());
      const customerName = (dataObj.name || 'Traveller').trim();
      const customerPhone = (dataObj.phone || '').trim();
      const customerEmail = (dataObj.email || '').trim();
      const customerInterest = (dataObj.interest || 'Trip Enquiry').trim();

      let submitted = false;

      try {
        const payload = new FormData();
        payload.append('name', customerName);
        payload.append('phone', customerPhone);
        payload.append('email', customerEmail);
        payload.append('interest', customerInterest);

        const res = await fetch(SITE_CONFIG.backendUrl, {
          method: 'POST',
          body: payload,
          headers: { Accept: 'application/json' }
        });
        const json = await res.json();
        if (res.ok && json.success) {
          submitted = true;
        }
      } catch (_) {
        submitted = false;
      }

      if (submitted) {
        form.reset();
        acsReportConversion();
        // Ab green box ke bajaye seedha Thanks Popup khulega!
        openGlobalPopup(customerPhone, customerEmail);
      } else if (feedback) {
        const waMsg = encodeURIComponent(`Hello, my name is ${customerName}. I want to enquire about ${customerInterest}. Phone: ${customerPhone}`);
        feedback.innerHTML = `⚠️ We could not submit the form right now. To connect instantly, please use: <a href="https://wa.me/${SITE_CONFIG.whatsappPhone}?text=${waMsg}" target="_blank" rel="noopener" style="text-decoration:underline; font-weight:bold; color:#856404;">WhatsApp us →</a>`;
        feedback.style.display = 'block';
        feedback.style.background = '#fff3cd';
        feedback.style.border = '1px solid #ffeeba';
        feedback.style.color = '#856404';
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  });

  // 6. WhatsApp Floating Button (Safe Injection)
  if (!document.querySelector('.whatsapp-floating-btn')) {
    const waLink = document.createElement('a');
    waLink.className = 'whatsapp-floating-btn';
    const waMessage = encodeURIComponent('Hello Wild Safari, I want to enquire about Jim Corbett tours and stays.');
    waLink.href = `https://wa.me/${SITE_CONFIG.whatsappPhone}?text=${waMessage}`;
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.setAttribute('aria-label', 'Chat with Wild Safari on WhatsApp');
    waLink.innerHTML = `
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.62.72 5.16 2.08 7.38L2.05 30l6.83-1.99C11.02 29.29 13.48 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.64c-2.27 0-4.49-.62-6.42-1.79l-.46-.28-4.76 1.39 1.4-4.63-.3-.48C4.24 19.9 3.56 17.98 3.56 16c0-6.86 5.58-12.44 12.44-12.44s12.44 5.58 12.44 12.44-5.58 12.44-12.44 12.44zm6.84-9.33c-.38-.19-2.24-1.11-2.59-1.23-.35-.13-.6-.19-.85.19-.25.38-.98 1.23-1.2 1.48-.22.25-.45.28-.82.1-.38-.19-1.59-.59-3.03-1.87-1.12-1-1.88-2.24-2.1-2.62-.22-.38-.02-.58.17-.77.17-.17.38-.45.56-.67.19-.22.25-.38.38-.63.13-.25.06-.48-.03-.67-.1-.19-.85-2.05-1.17-2.81-.31-.74-.63-.64-.85-.65-.22-.01-.48-.01-.73-.01s-.67.1-.98.45c-.38.38-1.46 1.43-1.46 3.48s1.5 4.04 1.71 4.32c.22.28 2.95 4.5 7.15 6.32 1 .43 1.78.69 2.39.88 1.01.32 1.93.28 2.66.17.81-.12 2.24-.92 2.56-1.8.31-.89.31-1.64.22-1.8-.09-.16-.34-.25-.72-.44z"/>
      </svg>
      <span>Chat on WhatsApp</span>
    `;
    document.body.appendChild(waLink);
  }

});

document.querySelectorAll('.form-note').forEach((note) => {
  if (!note.querySelector('a[href*="privacy-policy"]')) {
    note.insertAdjacentHTML('beforeend', ' <a href="privacy-policy.html" style="text-decoration:underline">Privacy Policy</a>');
  }
});