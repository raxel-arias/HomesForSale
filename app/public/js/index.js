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

/***/ "./app/public/src/index.js":
/*!*********************************!*\
  !*** ./app/public/src/index.js ***!
  \*********************************/
/***/ (() => {

eval("let html_span_currentYear = document.querySelector('#current-year') || false;\r\nlet html_span_propertyPrice = document.querySelector('#property-price') || false;\r\nlet html_span_propertyPrice__array = document.querySelectorAll('#card_image--price') || false;\r\nlet html_input_price = document.querySelector('#price') || false;\r\nlet html_input_nbathrooms = document.querySelector('#bathrooms') || false;\r\nlet html_input_nbedrooms = document.querySelector('#bedrooms') || false;\r\nlet html_input_nparkings = document.querySelector('#parkings') || false;\r\n\r\n(() => {\r\n    const NUM_REGEX = /\\B(?!\\.\\d*)(?=(\\d{3})+(?!\\d))/g;\r\n\r\n    if (html_span_currentYear) html_span_currentYear.textContent = new Date().getFullYear();\r\n\r\n    if (html_span_propertyPrice__array) html_span_propertyPrice__array.forEach(html_span_propertyPrice => html_span_propertyPrice.textContent = html_span_propertyPrice.textContent.replace(NUM_REGEX, \",\"));\r\n\r\n    if (html_span_propertyPrice) html_span_propertyPrice.textContent = html_span_propertyPrice.textContent.replace(NUM_REGEX, \",\");\r\n\r\n    if (html_input_price) {\r\n        const html_div_propertyValue = document.querySelector('#property-value');\r\n        html_div_propertyValue.textContent = html_input_price.value.toString().replace(NUM_REGEX, \",\") || 0;\r\n\r\n        html_input_price.addEventListener('input', (ev) => {\r\n            html_div_propertyValue.textContent = ev.target.value.toString().replace(NUM_REGEX, \",\");\r\n        });\r\n    }\r\n\r\n    if (html_input_nbathrooms) {\r\n        const html_div_nbathroomsValue = document.querySelector('#number-of-bathrooms');\r\n        html_div_nbathroomsValue.textContent = html_input_nbathrooms.value.toString().replace(NUM_REGEX, \",\") || 0;\r\n\r\n        html_input_nbathrooms.addEventListener('input', (ev) => {\r\n            html_div_nbathroomsValue.textContent = ev.target.value.toString().replace(NUM_REGEX, \",\");\r\n        });\r\n    }\r\n\r\n    if (html_input_nbedrooms) {\r\n        const html_div_nbedroomsValue = document.querySelector('#number-of-bedrooms');\r\n        html_div_nbedroomsValue.textContent = html_input_nbedrooms.value.toString().replace(NUM_REGEX, \",\") || 0;\r\n\r\n        html_input_nbedrooms.addEventListener('input', (ev) => {\r\n            html_div_nbedroomsValue.textContent = ev.target.value.toString().replace(NUM_REGEX, \",\");\r\n        });\r\n    }\r\n\r\n    if (html_input_nparkings) {\r\n        const html_div_nparkingsValue = document.querySelector('#number-of-parking-spaces');\r\n        html_div_nparkingsValue.textContent = html_input_nparkings.value.toString().replace(NUM_REGEX, \",\") || 0;\r\n\r\n        html_input_nparkings.addEventListener('input', (ev) => {\r\n            html_div_nparkingsValue.textContent = ev.target.value.toString().replace(NUM_REGEX, \",\");\r\n        });\r\n    }\r\n})();\n\n//# sourceURL=webpack://homesforsale/./app/public/src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/public/src/index.js"]();
/******/ 	
/******/ })()
;