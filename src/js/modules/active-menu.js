export const activeMenu = () => {
  const menu = document.getElementById('main-menu')
  if (menu) {
      const links = Array.from(menu.querySelectorAll('a'))
      links.map(link => {
          if (link.href === location.href || link.href === location.href.slice(0,-1)) link.classList.add('active')
      })
  }
}
