// Dynamic Pricing - Fetches packages from MeaChat API

// Module ID to Name Mapping
const MODULE_MAP = {
  1: { name: 'WhatsApp', icon: 'fab fa-whatsapp' },
  2: { name: 'Facebook', icon: 'fab fa-facebook' },
  3: { name: 'Instagram', icon: 'fab fa-instagram' },
  4: { name: 'Telegram', icon: 'fab fa-telegram' },
  5: { name: 'Chat Widget', icon: 'fas fa-comment' },
  6: { name: 'AI Chatbot', icon: 'fas fa-robot' },
  7: { name: 'Live Chat', icon: 'fas fa-headset' },
  8: { name: 'CRM', icon: 'fas fa-users' },
  9: { name: 'Analytics', icon: 'fas fa-chart-bar' },
  10: { name: 'Broadcasts', icon: 'fas fa-broadcast-tower' },
  11: { name: 'Templates', icon: 'fas fa-file-alt' },
  12: { name: 'Automation', icon: 'fas fa-cogs' },
  13: { name: 'API Access', icon: 'fas fa-code' },
  14: { name: 'Webhooks', icon: 'fas fa-plug' },
  15: { name: 'Team Members', icon: 'fas fa-user-friends' }
};


// Render pricing cards
function renderPricingCards(packages, containerId = 'pricing-cards') {
  const container = document.getElementById(containerId);
  if (!container || packages.length === 0) return;
  
  container.innerHTML = packages.map((pkg, index) => {
    const isFeatured = index === 1;
    const price = pkg.price === '0' ? 'Free' : `$${pkg.price}`;
    const period = pkg.price === '0' ? '' : '/month';
    
    return `
      <div class="pricing-card ${isFeatured ? 'featured' : ''}">
        <h3>${pkg.title}</h3>
        <div class="price">${price}<span>${period}</span></div>
        <p>${pkg.description || ''}</p>
        <ul>
          ${(pkg.modules || []).slice(0, 5).map(m => {
            const info = MODULE_MAP[m.module_id] || { name: 'Feature', icon: 'fas fa-check' };
            return `<li><i class="${info.icon}"></i> ${info.name}: ${formatLimit(m.limit)}</li>`;
          }).join('')}
        </ul>
        <button class="btn-primary">${pkg.price === '0' ? 'Start Free' : 'Get Started'}</button>
      </div>
    `;
  }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const packages = await fetchPackages();
  if (packages.length > 0) {
    renderPricingCards(packages);
  }
});

// ============================================
// DYNAMIC PRICING SYSTEM
// ============================================

// Pricing tiers based on subscriber count
const PRICING_TIERS = {
  1000: { price: 99 },
  5000: { price: 199 },
  10000: { price: 299 },
  25000: { price: 499 },
  50000: { price: 799 },
  100000: { price: 1299 },
  500000: { price: 2999 }
};

// Calculate price based on subscribers
function calculatePrice(subscribers, billingPeriod = 'monthly') {
  const tiers = Object.keys(PRICING_TIERS).map(Number).sort((a,b) => a-b);
  const tier = tiers.find(t => subscribers <= t) || tiers[tiers.length-1];
  
  let monthlyPrice = PRICING_TIERS[tier].price;
  let finalPrice = monthlyPrice;
  
  // Apply 40% discount for yearly (pay for 12 months, get 40% off)
  if (billingPeriod === 'yearly') {
    finalPrice = Math.round(monthlyPrice * 12 * 0.6);
  }
  
 
}



// Initialize dynamic pricing slider
function initDynamicPricing() {
      // Default billing period is YEARLY (show yearly price with 40% discount)
  let currentBilling = 'yearly';
  const slider = document.getElementById('contacts-slider');
      const priceDisplay = document.getElementById('pro-price');
    const contactsDisplay = document.getElementById('contacts-value');
  // Get billing toggle buttons - Monthly, Quarterly, Yearly
  const allPricingButtons = document.querySelectorAll('#pricing button');
  const monthlyBtn = Array.from(allPricingButtons).find(btn => btn.textContent.includes('Monthly'));
    const yearlyBtn = Array.from(allPricingButtons).find(btn => btn.textContent.includes('Yearly'));
  
  // Update price display
  function updatePrice() {
    const subscribers = parseInt(slider.value);
    const pricing = calculatePrice(subscribers, currentBilling);
    
    // Update price
    if (priceDisplay) {
      if (currentBilling === 'yearly') {
        priceDisplay.textContent = `$${pricing.price}/year`;
      } else {
        priceDisplay.textContent = `$${pricing.price}/month`;
      }
    }
    
    // Update contacts display
    if (contactsDisplay) {
      contactsDisplay.textContent = `${formatNumber(pricing.subscribers)} contacts`;
    }
    
    // Update slider display
    const sliderDisplay = document.querySelector('.text-gray-300');
    if (sliderDisplay && sliderDisplay.textContent.includes('contacts')) {
      sliderDisplay.textContent = `${formatNumber(subscribers)} contacts`;
    }
  }
  
  // Slider event
  slider.addEventListener('input', updatePrice);
  
  // Billing period toggle
    // Billing period toggle - Add event listeners to Monthly and Yearly buttons
  if (monthlyBtn) {
    monthlyBtn.addEventListener('click', () => {
      currentBilling = 'monthly';
      monthlyBtn.classList.add('active');
      if (yearlyBtn) yearlyBtn.classList.remove('active');
      updatePrice();
    });
  }
  
  if (yearlyBtn) {
    yearlyBtn.addEventListener('click', () => {
      currentBilling = 'yearly';
      yearlyBtn.classList.add('active');
      if (monthlyBtn) monthlyBtn.classList.remove('active');
      updatePrice();
    });
  }
// Initial update
  updatePrice();
    populatePricingDetailsTable();
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.pricing-period-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // شيل active من الكل
      buttons.forEach((b) => b.classList.remove('active'));

      // حط active على الزر المختار
      btn.classList.add('active');

      // هنا تقدر تغيّر الأسعار حسب data-period
      const period = btn.dataset.period;
      // مثال:
      // updatePricing(period);
    });
  });

  // خله يبدأ على monthly افتراضيا
  const defaultBtn = document.querySelector(
    '.pricing-period-btn[data-period="monthly"]'
  );
  if (defaultBtn) defaultBtn.classList.add('active');
});


// Run after packages are loaded
if (document.readyState === 'loading') {

  // Function to populate Pricing Details modal table
function populatePricingDetailsTable() {
  const tableBody = document.getElementById('pricing-table-body');
  if (!tableBody) return;
  
  // Clear existing content
  tableBody.innerHTML = '';
  
  // Create rows for each pricing tier
  Object.keys(PRICING_TIERS).forEach(subscriberCount => {
    const tier = PRICING_TIERS[subscriberCount];
    const monthlyPrice = tier.price;
    const yearlyPrice = Math.round(monthlyPrice * 12 * 0.6); // 40% discount
    
    // Create table row
    const row = document.createElement('tr');
    row.className = 'border-b border-[#2D2654] hover:bg-[#2D2654]/50 transition-colors';
    
    // Contacts Range cell
    const contactsCell = document.createElement('td');
    contactsCell.className = 'py-4 px-6';
    contactsCell.textContent = formatNumber(parseInt(subscriberCount));
    
    // Price cell
    const priceCell = document.createElement('td');
    priceCell.className = 'py-4 px-6 text-right';
    priceCell.innerHTML = `
      <div class="font-bold text-lg text-[#00D9B1]">$${monthlyPrice}/mo</div>
      <div class="text-sm text-gray-400">or $${yearlyPrice}/yr (Save 40%)</div>
    `;
    
    row.appendChild(contactsCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);
  });
}

  document.addEventListener('DOMContentLoaded', initDynamicPricing);
} else {
  initDynamicPricing();
}

// Toggle Monthly / Yearly pricing for static plans

document.addEventListener('DOMContentLoaded', () => {
  const periodButtons = document.querySelectorAll('.pricing-period-btn');
  const priceValues = document.querySelectorAll('.price-value');
  const billingTexts = document.querySelectorAll('.billing-text');

  if (!periodButtons.length || !priceValues.length) return;

  // بداية الصفحة: نخلي الأسعار على السنوي
  priceValues.forEach(el => {
    const yearly = el.getAttribute('data-yearly'); // مثال 9.99
    if (yearly) el.textContent = yearly;
  });

  billingTexts.forEach(el => {
    el.textContent = 'Billed yearly (save ~20%)';
  });

  // نتأكد أن زر السنوي مفعّل افتراضيا في الستايل
  periodButtons.forEach(btn => {
    const period = btn.getAttribute('data-period');
    if (period === 'yearly') {
      btn.classList.add('active', 'text-white');
      btn.classList.remove('text-gray-400');
    } else {
      btn.classList.remove('active', 'text-white');
      btn.classList.add('text-gray-400');
    }
  });

  periodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.getAttribute('data-period');

      // ستايل الأزرار
      periodButtons.forEach(b => {
        b.classList.remove('active', 'text-white');
        b.classList.add('text-gray-400');
      });
      btn.classList.add('active', 'text-white');

      // تحديث الأسعار
      priceValues.forEach(el => {
        const monthly = el.getAttribute('data-monthly');   // مثال 12.49
        const yearly = el.getAttribute('data-yearly');     // مثال 9.99

        if (!monthly || !yearly) return;

        if (period === 'yearly') {
          el.textContent = yearly;
        } else {
          el.textContent = monthly;
        }
      });

      // تحديث نص الفوترة
      billingTexts.forEach(el => {
        if (period === 'yearly') {
          el.textContent = 'Billed yearly (save ~20%)';
        } else {
          el.textContent = 'Billed monthly';
        }
      });
    });
  });
});
