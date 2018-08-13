export const activeMenu = () => {
    const menu = document.getElementById('main-menu')
    if (menu) {
        const links = Array.from(menu.querySelectorAll('a'))
        links.map(link => {
            if (link.href === location.href) link.classList.add('active')
        })
    }
}