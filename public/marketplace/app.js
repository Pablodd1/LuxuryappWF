let catalogData = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data.json');
    catalogData = await response.json();
    
    initMetrics(catalogData);
    initBrandFilter(catalogData);
    renderGrid(catalogData);
    setupEventListeners();
    setupGuideModal();
  } catch (err) {
    console.error('Failed to load marketplace data:', err);
  }
});

function initMetrics(data) {
  const totalItems = data.length;
  const totalVal = data.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
  const avgVal = totalItems > 0 ? totalVal / totalItems : 0;
  const uniqueSellers = new Set(data.map(item => item.from_number || item.from_name)).size;
  
  document.getElementById('metric-total-value').innerText = '$' + Math.round(totalVal).toLocaleString();
  document.getElementById('metric-items-count').innerText = totalItems.toLocaleString();
  document.getElementById('metric-avg-price').innerText = '$' + Math.round(avgVal).toLocaleString();
  document.getElementById('metric-sellers').innerText = uniqueSellers.toLocaleString();
}

function initBrandFilter(data) {
  const brandSelect = document.getElementById('filter-brand');
  const brands = Array.from(new Set(data.map(item => item.brand).filter(Boolean)));
  
  brands.sort().forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.innerText = brand;
    brandSelect.appendChild(opt);
  });
}

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = '';
  
  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted);">No luxury items found matching your filters.</div>';
    return;
  }
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    const intentClass = item.type === 'sale' ? 'badge-sale' : 'badge-search';
    const intentLabel = item.type === 'sale' ? 'WTS / Selling' : 'WTB / Looking For';
    const priceFormatted = parseFloat(item.price) > 0 ? '$' + parseFloat(item.price).toLocaleString() : 'Inquire / Best Offer';
    
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240"><rect width="300" height="240" fill="%23111827"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="16" font-weight="bold">WATCHFACTS LUXURY</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="12">Image Pending Verification</text></svg>`;
    const imgSrc = item.full_image_url || fallbackSvg;
    
    const colorTag = item.detected_color || 'Variant';

    card.innerHTML = `
      <div class="card-image-wrapper">
        <span class="badge-origin">${item.origin || 'Group Chat'}</span>
        <span class="badge-intent ${intentClass}">${intentLabel}</span>
        <img class="card-img" src="${imgSrc}" alt="${item.brand || 'Item'}" loading="lazy" onerror="this.src='${fallbackSvg}'; this.parentElement.parentElement.style.order=9999;">
      </div>
      <div class="card-content">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="card-category">${item.category_name || 'LUXURY ITEM'}</div>
          <span style="font-size:10px; padding:2px 8px; border-radius:12px; background:rgba(245,158,11,0.15); color:var(--accent-gold); font-weight:700;">${colorTag}</span>
        </div>
        <div class="card-title">${item.brand || ''} ${item.model || ''}</div>
        <div class="card-raw">${item.raw_message}</div>
        <div class="card-footer">
          <div class="card-price">${priceFormatted}</div>
          <div class="card-seller-name">👤 ${item.from_name || 'Verified Member'}</div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const intentSelect = document.getElementById('filter-intent');
  const brandSelect = document.getElementById('filter-brand');
  const sortSelect = document.getElementById('filter-sort');
  
  const filterHandler = () => {
    let filtered = [...catalogData];
    const searchVal = searchInput.value.toLowerCase().trim();
    const intentVal = intentSelect.value;
    const brandVal = brandSelect.value;
    const sortVal = sortSelect.value;
    
    if (searchVal) {
      filtered = filtered.filter(i => 
        (i.raw_message && i.raw_message.toLowerCase().includes(searchVal)) ||
        (i.from_name && i.from_name.toLowerCase().includes(searchVal)) ||
        (i.brand && i.brand.toLowerCase().includes(searchVal)) ||
        (i.detected_color && i.detected_color.toLowerCase().includes(searchVal))
      );
    }
    
    if (intentVal !== 'all') {
      filtered = filtered.filter(i => i.type === intentVal);
    }
    
    if (brandVal !== 'all') {
      filtered = filtered.filter(i => i.brand === brandVal);
    }
    
    if (sortVal === 'price-desc') {
      filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
    } else if (sortVal === 'price-asc') {
      filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
    } else if (sortVal === 'newest') {
      filtered.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
    }
    
    renderGrid(filtered);
  };
  
  searchInput.addEventListener('input', filterHandler);
  intentSelect.addEventListener('change', filterHandler);
  brandSelect.addEventListener('change', filterHandler);
  sortSelect.addEventListener('change', filterHandler);
  
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
}

function setupGuideModal() {
  const guideOverlay = document.getElementById('guide-modal-overlay');
  const guideClose = document.getElementById('guide-modal-close');
  
  const openGuide = () => guideOverlay.classList.add('active');
  const closeGuide = () => guideOverlay.classList.remove('active');

  const btnTop = document.getElementById('btn-group-instructions-top');
  const btnBanner = document.getElementById('btn-banner-guide');
  const btnBottom = document.getElementById('btn-bottom-guide');

  if (btnTop) btnTop.addEventListener('click', openGuide);
  if (btnBanner) btnBanner.addEventListener('click', openGuide);
  if (btnBottom) btnBottom.addEventListener('click', openGuide);
  if (guideClose) guideClose.addEventListener('click', closeGuide);

  guideOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'guide-modal-overlay') closeGuide();
  });
}

function openModal(item) {
  const overlay = document.getElementById('modal-overlay');
  
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240"><rect width="300" height="240" fill="%23111827"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="16" font-weight="bold">WATCHFACTS LUXURY</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="12">Image Pending Verification</text></svg>`;
  
  const imgElem = document.getElementById('modal-img');
  imgElem.src = item.full_image_url || fallbackSvg;
  imgElem.onerror = () => { imgElem.src = fallbackSvg; };

  document.getElementById('modal-category').innerText = item.category_name || 'LUXURY GOODS';
  document.getElementById('modal-title').innerText = `${item.brand || 'Luxury Listing'} ${item.model || ''}`;
  
  const priceVal = parseFloat(item.price);
  document.getElementById('modal-price').innerText = priceVal > 0 ? '$' + priceVal.toLocaleString() : 'Contact Seller for Quote';
  
  document.getElementById('modal-raw-text').innerText = item.raw_message;
  document.getElementById('modal-date').innerText = new Date(item.date_time).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  document.getElementById('modal-tag').innerText = item.id_tag ? item.id_tag.substring(0, 16) + '...' : item.id.substring(0, 12);
  
  // Brand & Color Comparative Analytics
  const ba = item.brand_analytics || {};
  document.getElementById('modal-brand-listings').innerText = `${ba.total_listings_for_brand || 1} Items`;
  document.getElementById('modal-brand-avg-price').innerText = ba.avg_brand_price ? '$' + Math.round(ba.avg_brand_price).toLocaleString() : 'N/A';
  document.getElementById('modal-brand-range').innerText = (ba.min_brand_price && ba.max_brand_price) ? `$${Math.round(ba.min_brand_price).toLocaleString()} - $${Math.round(ba.max_brand_price).toLocaleString()}` : 'Market Price';
  document.getElementById('modal-color-edition').innerText = item.detected_color ? `${item.detected_color} Variant` : 'Standard Edition';

  // Seller Tracking
  const sellerName = item.from_name || 'Private Collector';
  document.getElementById('modal-seller-name').innerText = sellerName;
  document.getElementById('modal-seller-avatar').innerText = sellerName.charAt(0).toUpperCase();
  
  const cleanPhone = (item.from_number || '').replace(/[^0-9]/g, '');
  document.getElementById('modal-seller-phone').innerText = item.from_number ? `+${item.phone_code || ''} ${item.from_number}` : 'Verified Member';
  
  const waBtn = document.getElementById('modal-wa-btn');
  if (cleanPhone) {
    waBtn.href = `https://wa.me/${cleanPhone}`;
    waBtn.style.display = 'inline-flex';
  } else {
    waBtn.style.display = 'none';
  }
  
  overlay.classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}
