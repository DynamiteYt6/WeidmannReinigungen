(function() {
  'use strict';

  // Mobile Menu
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      const icon = hamburger.querySelector('i');
      icon.classList.toggle('fa-bars', !isOpen);
      icon.classList.toggle('fa-xmark', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Theme Toggle
  const themeBtn = document.getElementById('themeToggle');
  
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (isDark) {
      document.body.classList.add('dark');
      updateThemeIcon(true);
    }
  }

  function updateThemeIcon(isDark) {
    const icon = themeBtn.querySelector('i');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    themeBtn.setAttribute('aria-pressed', isDark);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      updateThemeIcon(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  loadTheme();

  // Language Dropdown
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  const currentLang = document.getElementById('currentLang');

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', isOpen);
    });

    langMenu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.dataset.lang;
        if (currentLang) currentLang.textContent = lang.toUpperCase();
        langMenu.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        setLanguage(lang);
      });
    });

    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langMenu.classList.contains('open')) {
        langMenu.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        langToggle.focus();
      }
    });
  }

  // Initialize language
  initLanguage();
})();


    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would normally send the data to a server
      // For now, we'll just show an alert
      alert(translations[document.documentElement.lang]?.['contact.success'] || 'Thank you! We will get back to you shortly.');
      
      // Reset form
      this.reset();
    });

    //Mailchimp Form
    document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "EN";
  document.getElementById("mc-language").value = lang.toUpperCase();
});
