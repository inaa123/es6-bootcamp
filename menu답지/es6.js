document.addEventListener('DOMContentLoaded', () => {
  mainNav();

  function mainNav() {
    const mainMenuItems = document.querySelectorAll('.gnb-wrapper .gnb > li')
    const subMenus = Array.from(document.querySelectorAll('.gnb-wrapper .submenu-list'));
    const mainBg = document.createElement('div');
    mainBg.className = 'main-bg';
    document.querySelector('.header-bottom-wrapper').appendChild(mainBg);

    mainMenuItems.forEach((menuItem) => {
      menuItem.addEventListener('mouseenter', () => onMenuOver());
    });

    document.querySelector('.header-wrapper').addEventListener('mouseleave', outMenuOver);

    function onMenuOver() {
      subMenus.forEach((submenu) => {
        submenu.style.display = 'block';
      });
      mainBg.style.display = 'block';

      mainMenuItems.forEach((item) => {
        item.classList.remove('active');
      });
    }

    function outMenuOver() {
      subMenus.forEach((submenu) => {
        submenu.style.display = 'none';
      });
      mainBg.style.display = 'none';

        mainMenuItems.forEach((item) => {
          item.classList.remove('active');
        });
      
    }
  }
});
