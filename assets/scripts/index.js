document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger-menu');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      // Toggle de actieve status op de sidebar en de knop zelf
      sidebar.classList.toggle('is-active');
      hamburger.classList.toggle('is-active');
      
      // Update aria-expanded voor screenreaders
      const isActive = sidebar.classList.contains('is-active');
      hamburger.setAttribute('aria-expanded', isActive);
    });
  }
});