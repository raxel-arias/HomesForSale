/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/public/src/navBar.js":
/*!**********************************!*\
  !*** ./app/public/src/navBar.js ***!
  \**********************************/
/***/ (() => {

eval("(() => {\r\n    document.addEventListener('DOMContentLoaded', () => {\r\n        const html_button_navbar = document.querySelector('.navbar-burger');\r\n        const html_button_closeNavbar = document.querySelector('.navbar-close');\r\n        const html_div_menu = document.querySelector('.navbar-menu');\r\n        const html_div_sidebar = html_div_menu.querySelector('#sidebar');\r\n\r\n        if (!html_button_navbar || !html_div_menu || !html_button_closeNavbar) return;\r\n\r\n        let hidding = false;\r\n\r\n        //Opem\r\n        html_button_navbar.addEventListener('click', () => {\r\n\r\n            //Show\r\n            if (html_div_menu.classList.contains('hidden') && !html_div_sidebar.classList.contains('sidebar') && !html_div_sidebar.classList.contains('sidebar-hide')) {\r\n                html_div_menu.classList.toggle('hidden');\r\n                html_div_sidebar.classList.toggle('sidebar');\r\n                return;\r\n            }\r\n\r\n            if (hidding) return;\r\n\r\n            hidding = true;\r\n\r\n            html_div_sidebar.classList.toggle('sidebar-hide');\r\n            setTimeout(() => {\r\n                html_div_menu.classList.toggle('hidden');\r\n                html_div_sidebar.classList.toggle('sidebar');\r\n                html_div_sidebar.classList.remove('sidebar-hide');\r\n\r\n                hidding = false;\r\n            }, 200);\r\n        });\r\n\r\n        //Close\r\n        html_button_closeNavbar.addEventListener('click', () => {\r\n            if (hidding) return;\r\n\r\n            html_div_sidebar.classList.toggle('sidebar-hide');\r\n            setTimeout(() => {\r\n                html_div_menu.classList.toggle('hidden');\r\n                html_div_sidebar.classList.toggle('sidebar');\r\n                html_div_sidebar.classList.remove('sidebar-hide');\r\n\r\n                hidding = false;\r\n            }, 200);\r\n        });\r\n    });\r\n})();\n\n//# sourceURL=webpack://homesforsale/./app/public/src/navBar.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/public/src/navBar.js"]();
/******/ 	
/******/ })()
;