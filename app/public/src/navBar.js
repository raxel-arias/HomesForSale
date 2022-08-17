(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const html_button_navbar = document.querySelector('.navbar-burger');
        const html_button_closeNavbar = document.querySelector('.navbar-close');
        const html_div_menu = document.querySelector('.navbar-menu');

        if (!html_button_navbar || !html_div_menu || !html_button_closeNavbar) return;

        //Opem
        html_button_navbar.addEventListener('click', () => html_div_menu.classList.toggle('hidden'));

        //Close
        html_button_closeNavbar.addEventListener('click', () => html_div_menu.classList.toggle('hidden'));
    });
})();