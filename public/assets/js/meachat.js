// MeaChat Central Scripts
// ...existing code...
// تم حذف كود الأنميشن الخاص بالجزيئات (Particles) بناءً على طلب المستخدم
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       THEME TOGGLE - Dark/Light Mode
       ============================================ */
    
    // Initialize theme on page load
    function initTheme() {
        const savedTheme = localStorage.getItem('meachat-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark
        applyTheme(theme);
    }
    
    function applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'light') {
            html.classList.add('light-mode');
        } else {
            html.classList.remove('light-mode');
        }
        localStorage.setItem('meachat-theme', theme);
    }
    
    function toggleTheme() {
        const html = document.documentElement;
        const isLight = html.classList.contains('light-mode');
        applyTheme(isLight ? 'dark' : 'light');
    }
    
    // Theme toggle button event listener
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Initialize theme on load
    initTheme();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('meachat-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    /* ============================================
       EXISTING CODE BELOW
       ============================================ */
    
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', function() {
      const isActive = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('overflow-hidden');
      // Update ARIA attributes for accessibility
      try {
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        overlay.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      } catch (e) {
        // ignore in very old browsers
      }
    });
    overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      // Ensure ARIA attributes reflect closed state
      try {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
      } catch (e) {}
    });
        const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        try {
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          overlay.setAttribute('aria-hidden', 'true');
        } catch (e) {}
      });
    });
    }

    // Pricing Calculator
    const slider = document.getElementById('conversation-slider');
    const valueDisplay = document.getElementById('conversation-value');
    const proConversations = document.getElementById('pro-conversations');
    const agencyConversations = document.getElementById('agency-conversations');
    const proPrice = document.getElementById('pro-price');
    const agencyPrice = document.getElementById('agency-price');
    const periodBtns = document.querySelectorAll('.pricing-period-btn');
    const billingPeriods = document.querySelectorAll('.billing-period');
    let currentPeriod = 'monthly';
    let currentValue = 50;
    function formatNumber(num) {
        if (num >= 1000) { return (num / 1000) + 'K'; }
        return num.toString();
    }
    function updatePrices() {
        if (!valueDisplay || !proConversations || !agencyConversations || !proPrice || !agencyPrice) return;
        valueDisplay.textContent = formatNumber(currentValue * 1000);
        proConversations.textContent = formatNumber(currentValue * 1000);
        agencyConversations.textContent = formatNumber(currentValue * 5000);
        let proBasePrice = 99;
        let agencyBasePrice = 299;
        const volumeMultiplier = 1 + (currentValue - 50) / 100;
        proBasePrice = Math.round(proBasePrice * volumeMultiplier);
        agencyBasePrice = Math.round(agencyBasePrice * volumeMultiplier);
        let discount = 1;
        if (currentPeriod === 'quarterly') { discount = 0.9; }
        else if (currentPeriod === 'yearly') { discount = 0.8; }
        proPrice.textContent = Math.round(proBasePrice * discount);
        agencyPrice.textContent = Math.round(agencyBasePrice * discount);
    }
    if (slider) {
        slider.addEventListener('input', function() {
            currentValue = parseInt(this.value);
            updatePrices();
        });
    }
    if (periodBtns.length > 0) {
        periodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                periodBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentPeriod = this.dataset.period;
                billingPeriods.forEach(span => { span.textContent = currentPeriod; });
                updatePrices();
            });
        });
    }
    updatePrices();

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');
        if (question && icon) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const faqIcon = faq.querySelector('.faq-icon');
                    if (faqIcon) {
                        faqIcon.classList.remove('ri-subtract-line');
                        faqIcon.classList.add('ri-add-line');
                    }
                });
                if (!isActive) {
                    item.classList.add('active');
                    icon.classList.remove('ri-add-line');
                    icon.classList.add('ri-subtract-line');
                }
            });
        }
    });

   
   
});
// ...rest of the JS from the <script> tags...
