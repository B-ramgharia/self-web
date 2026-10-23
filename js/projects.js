// ===== PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const pct = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  follower.style.left = e.clientX + 'px';
  follower.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV =====
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbar.classList.toggle('open');
});

// ===== DARK/LIGHT MODE =====
const toggle = document.getElementById('darkmode-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  toggle.checked = true;
}
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// ===== FILTER CHIPS =====
const chips = document.querySelectorAll('.filter-chip');
const cards = document.querySelectorAll('.project-detail-card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));
