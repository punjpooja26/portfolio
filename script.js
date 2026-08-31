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

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get('name')}`);
  const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
  window.location.href = `mailto:pooja.punj@example.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Opening your email client...';
});
