/* ===== NAVBAR MOBILE TOGGLE ===== */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===== FLEET FILTER ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards   = document.querySelectorAll('.car-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      carCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ===== MERCH FILTER ===== */
  const merchFilterBtns = document.querySelectorAll('.merch-filter-btn');
  const merchCards      = document.querySelectorAll('.merch-card');

  merchFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      merchFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      merchCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ===== RATING BAR ANIMATION ===== */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => {
      const width = bar.style.width;
      bar.dataset.width = width;
      bar.style.width = '0';
      observer.observe(bar);
    });
  }

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Message sent! We\'ll be in touch within 24 hours.');
      contactForm.reset();
    });
  }

  /* ===== REVIEW FORM ===== */
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('⭐ Thank you for your review!');
      reviewForm.reset();
      const stars = reviewForm.querySelectorAll('.star-input');
      stars.forEach(s => s.classList.remove('selected'));
    });
  }

  /* ===== STAR RATING INPUT ===== */
  const starInputs = document.querySelectorAll('.star-input');
  starInputs.forEach((star, index) => {
    star.addEventListener('click', () => {
      starInputs.forEach((s, i) => {
        s.textContent = i <= index ? '★' : '☆';
        s.classList.toggle('selected', i <= index);
      });
      const ratingField = document.getElementById('ratingValue');
      if (ratingField) ratingField.value = index + 1;
    });
    star.addEventListener('mouseover', () => {
      starInputs.forEach((s, i) => {
        s.textContent = i <= index ? '★' : '☆';
      });
    });
    star.addEventListener('mouseout', () => {
      starInputs.forEach((s, i) => {
        const selected = s.classList.contains('selected');
        if (!selected) s.textContent = '☆';
      });
    });
  });

  /* ===== ADD TO CART ===== */
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.merch-card').querySelector('.merch-name').textContent;
      showToast(`🛒 ${name} added to cart!`);
    });
  });

  /* ===== BOOK NOW ===== */
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const car = btn.closest('.car-card').querySelector('.car-name').textContent;
      showToast(`📞 Booking request for ${car} — we'll call you shortly!`);
    });
  });

  /* ===== SCROLL ANIMATIONS ===== */
  const animItems = document.querySelectorAll('.car-card, .review-card, .merch-card, .feature-card');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    animObserver.observe(item);
  });
});

/* ===== TOAST HELPER ===== */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}
