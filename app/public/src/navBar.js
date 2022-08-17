(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const html_button_navbar = document.querySelector('.navbar-burger');
        const html_button_closeNavbar = document.querySelector('.navbar-close');
        const html_div_menu = document.querySelector('.navbar-menu');
        const html_div_sidebar = html_div_menu.querySelector('#sidebar');

        if (!html_button_navbar || !html_div_menu || !html_button_closeNavbar) return;

        let hidding = false;

        //Opem
        html_button_navbar.addEventListener('click', () => {

            //Show
            if (html_div_menu.classList.contains('hidden') && !html_div_sidebar.classList.contains('sidebar') && !html_div_sidebar.classList.contains('sidebar-hide')) {
                html_div_menu.classList.toggle('hidden');
                html_div_sidebar.classList.toggle('sidebar');
                return;
            }

            if (hidding) return;

            hidding = true;

            html_div_sidebar.classList.toggle('sidebar-hide');
            setTimeout(() => {
                html_div_menu.classList.toggle('hidden');
                html_div_sidebar.classList.toggle('sidebar');
                html_div_sidebar.classList.remove('sidebar-hide');

                hidding = false;
            }, 200);
        });

        //Close
        html_button_closeNavbar.addEventListener('click', () => {
            if (hidding) return;

            html_div_sidebar.classList.toggle('sidebar-hide');
            setTimeout(() => {
                html_div_menu.classList.toggle('hidden');
                html_div_sidebar.classList.toggle('sidebar');
                html_div_sidebar.classList.remove('sidebar-hide');

                hidding = false;
            }, 200);
        });
    });
})();