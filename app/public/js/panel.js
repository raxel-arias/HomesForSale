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

/***/ "./app/public/src/panel.js":
/*!*********************************!*\
  !*** ./app/public/src/panel.js ***!
  \*********************************/
/***/ (() => {

eval("const html_buttons_publish_array = document.querySelectorAll('#publish-property');\r\nconst html_buttons_delete_array = document.querySelectorAll('#delete-property');\r\n\r\nconst token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');\r\nconst location = window.location.host;\r\n\r\nhtml_buttons_publish_array.forEach(html_btn_publishProperty => {\r\n    html_btn_publishProperty.addEventListener('click', async (ev) => {\r\n        const property_id = ev.target.dataset.property;\r\n        \r\n        const settings = {\r\n            method: 'PATCH',\r\n            headers: {\r\n                Accept: 'application/json',\r\n                'Content-Type': 'application/json',\r\n                'CSRF-Token': token\r\n            }\r\n        }\r\n    \r\n        try {\r\n            const response = await fetch(`http://${location}/properties/change-status/${property_id}`, settings);\r\n    \r\n            ev.target.classList.toggle('bg-green-500');\r\n            ev.target.classList.toggle('bg-gray-400');\r\n\r\n            if (ev.target.classList.contains('bg-green-500')) ev.target.textContent = 'Published';\r\n            if (ev.target.classList.contains('bg-gray-400')) ev.target.textContent = 'Not published';\r\n        } catch (error) {\r\n            console.log(error.data);\r\n        }\r\n    });\r\n});\r\n\r\nhtml_buttons_delete_array.forEach(html_btn_deleteProperty => {\r\n    html_btn_deleteProperty.addEventListener('click', async (ev) => {\r\n        const property_id = ev.target.dataset.property;\r\n\r\n        const settings = {\r\n            method: 'DELETE',\r\n            headers: {\r\n                Accept: 'application/json',\r\n                'Content-Type': 'application/json',\r\n                'CSRF-Token': token\r\n            }\r\n        }\r\n\r\n        try {\r\n            const response = await fetch(`http://${location}/properties/delete/${property_id}`, settings);\r\n\r\n            window.location.reload();\r\n        } catch (error) {\r\n            console.log(error.data);\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://homesforsale/./app/public/src/panel.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/public/src/panel.js"]();
/******/ 	
/******/ })()
;