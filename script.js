const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// ScrollSpy Navigation Active Highlight & Back To Top Button
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');
const backToTopBtn = document.querySelector('#back-to-top');

window.addEventListener('scroll', () => {
  let currentSectionId = '';
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });

  if (backToTopBtn) {
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get('name')}`);
  const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
  window.location.href = `mailto:punjpooja26@gmail.com?subject=${subject}&body=${body}`;
  if (formStatus) {
    formStatus.textContent = 'Opening your email client...';
    formStatus.style.color = 'var(--navy)';
    formStatus.style.fontWeight = '600';
  }
});
