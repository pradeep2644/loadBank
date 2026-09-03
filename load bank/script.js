const PRODUCT_LINE = {
  name: 'Load Power Solutions',
  description: 'AC resistive, DC resistive, three phase AC and inductive load banks for industrial power validation, battery and rectifier testing, UPS commissioning, and factory acceptance tests.',
  applications: ['Generator Testing', 'UPS Validation', 'Battery & Rectifier Test', 'Transformer Testing', 'Factory Acceptance Test', 'Industrial Power Testing'],
  items: [
    'AC Resistive Load Bank',
    'DC Resistive Load Bank',
    'Three Phase AC Load Bank',
    'Inductive Load Bank'
  ]
};

const WHATSAPP_NUMBER = '917499140133';
const WA_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

function openWhatsApp(productName) {
  const text = productName
    ? `Hello Empire Automation,\n\nI am interested in *${productName}*.\n\nPlease share quotation, specifications, and delivery details.\n\nThank you.`
    : `Hello Empire Automation,\n\nI would like to enquire about your Load Power Solutions and load bank products.\n\nPlease share details and quotation.\n\nThank you.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function sendEnquiryViaWhatsApp(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value.trim() || '';
  const mobile = form.querySelector('[name="mobile"]')?.value.trim() || '';
  const email = form.querySelector('[name="email"]')?.value.trim() || '';
  const requirement = form.querySelector('[name="requirement"]')?.value.trim() || '';
  const product = document.getElementById('modalProduct')?.textContent.trim() || '';

  let text = 'Hello Empire Automation,\n\nI would like to make an enquiry.';
  if (product && form.closest('#enquiryModal')) text += `\n\nProduct: *${product}*`;
  if (name) text += `\n\nName: ${name}`;
  if (mobile) text += `\nPhone: ${mobile}`;
  if (email) text += `\nEmail: ${email}`;
  if (requirement) text += `\n\nRequirement:\n${requirement}`;
  text += '\n\nThank you.';

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

  if (form.closest('#enquiryModal')) closeEnquiry();
  form.reset();
  if (form.closest('#enquiryModal')) document.getElementById('modalProduct').textContent = '';
}

function initProductWhatsApp() {
  document.querySelectorAll('.product-footer').forEach(footer => {
    if (footer.querySelector('.btn-whatsapp')) return;
    const enquireBtn = footer.querySelector('.btn-primary');
    if (!enquireBtn) return;
    const match = enquireBtn.getAttribute('onclick')?.match(/openEnquiry\('(.+)'\)/);
    if (!match) return;
    const productName = match[1];

    const btns = document.createElement('div');
    btns.className = 'product-btns';
    footer.replaceChild(btns, enquireBtn);
    btns.appendChild(enquireBtn);

    const waBtn = document.createElement('button');
    waBtn.type = 'button';
    waBtn.className = 'btn btn-whatsapp btn-sm';
    waBtn.setAttribute('aria-label', 'WhatsApp');
    waBtn.innerHTML = WA_ICON;
    waBtn.addEventListener('click', () => openWhatsApp(productName));
    btns.appendChild(waBtn);
  });
}

function productSlug(name) {
  return 'product-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function scrollToProduct(e, slug) {
  e.preventDefault();
  const search = document.getElementById('productSearch');
  if (search?.value) {
    search.value = '';
    filterProducts();
  }
  const card = document.getElementById(slug);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('product-highlight');
  setTimeout(() => card.classList.remove('product-highlight'), 2000);
}

function initCatalog() {
  document.getElementById('breadcrumbCurrent').textContent = PRODUCT_LINE.name;
  document.getElementById('panelTitle').textContent = PRODUCT_LINE.name;
  document.getElementById('panelDesc').textContent = PRODUCT_LINE.description;

  document.getElementById('panelApplications').innerHTML =
    PRODUCT_LINE.applications.map(a => `<span>${a}</span>`).join('');

  document.getElementById('panelItems').innerHTML =
    PRODUCT_LINE.items.map(item => {
      const slug = productSlug(item);
      return `<li><a href="#${slug}" class="product-line-link" onclick="scrollToProduct(event, '${slug}')">${item}</a></li>`;
    }).join('');

  filterProducts();
}

function filterProducts() {
  const query = (document.getElementById('productSearch')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;

  cards.forEach(card => {
    const search = card.dataset.search || '';
    const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
    const matchSearch = !query || search.includes(query) || title.includes(query);

    if (matchSearch) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  document.getElementById('resultCount').textContent = visible;
  document.getElementById('emptyState').hidden = visible > 0;
}

function openEnquiry(productName) {
  document.getElementById('modalProduct').textContent = productName || '';
  document.getElementById('enquiryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEnquiry() {
  document.getElementById('enquiryModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('enquiryModal').addEventListener('click', e => {
  if (e.target.id === 'enquiryModal') closeEnquiry();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeEnquiry();
    document.getElementById('searchPanel').classList.remove('open');
  }
});

document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchPanel').classList.toggle('open');
});

document.getElementById('productSearch')?.addEventListener('input', filterProducts);

const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === entry.target.id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroCarouselDots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let timer;

  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', slide.querySelector('.hero-slide-label')?.textContent || `Product ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.hero-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  restartTimer();
}

function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.reveal').forEach(el => {
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    observer.observe(el);
  });
}

initCatalog();
initProductWhatsApp();
initHeroCarousel();
initScrollReveal();
