/* ====================================================
   Linfy Tech — Main JavaScript
   ==================================================== */

(function () {
  'use strict';

  // ── Navbar scroll effect ────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => { navbar.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu toggle ──────────────────────────────
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen   = document.getElementById('icon-open');
  const iconClose  = document.getElementById('icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      iconOpen.classList.toggle('hidden', !isOpen);
      iconClose.classList.toggle('hidden', isOpen);
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // ── Intersection Observer — reveal on scroll ────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Budget radio pill styling ───────────────────────
  const budgetOptions = document.querySelectorAll('.budget-option input[type="radio"]');
  budgetOptions.forEach(radio => {
    radio.addEventListener('change', () => {
      budgetOptions.forEach(r => r.parentElement.querySelector('span').classList.remove('border-brand-indigo', 'text-brand-indigo'));
      if (radio.checked) { radio.parentElement.querySelector('span').classList.add('border-brand-indigo', 'text-brand-indigo'); }
    });
  });

  // ── Contact form handling ───────────────────────────
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = document.getElementById('btn-text');
  const btnArrow   = document.getElementById('btn-arrow');
  const btnSpinner = document.getElementById('btn-spinner');
  const successMsg = document.getElementById('success-msg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      if (!name || !email || !message) { form.classList.add('shake'); setTimeout(() => form.classList.remove('shake'), 600); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.querySelector('#email').classList.add('border-red-500'); setTimeout(() => form.querySelector('#email').classList.remove('border-red-500'), 2000); return; }
      submitBtn.disabled = true;
      btnText.textContent = 'Sending…';
      btnArrow.classList.add('hidden');
      btnSpinner.classList.remove('hidden');
      await new Promise(resolve => setTimeout(resolve, 1800));
      form.querySelectorAll('input, textarea, select, button').forEach(el => el.classList.add('hidden'));
      form.querySelectorAll('label, div').forEach(el => el.style.display = 'none');
      successMsg.classList.remove('hidden');
      successMsg.style.display = 'block';
    });
  }

  // ── Smooth anchor scrolling ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();