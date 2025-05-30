const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');

dropdown.addEventListener('mouseenter', () => {
  dropdownContent.style.display = 'flex';
});

dropdown.addEventListener('mouseleave', () => {
  dropdownContent.style.display = 'none';
});
