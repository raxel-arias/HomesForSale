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

/***/ "./app/public/src/maps-public.js":
/*!***************************************!*\
  !*** ./app/public/src/maps-public.js ***!
  \***************************************/
/***/ (() => {

eval("(async () => {\r\n    document.addEventListener('DOMContentLoaded', () => {\r\n        const html_p_latitude = document.querySelector('#latitude');\r\n        const html_p_longitude = document.querySelector('#longitude');\r\n        const html_p_address = document.querySelector('#address');\r\n\r\n        const lat = html_p_latitude.textContent;\r\n        const lng = html_p_longitude.textContent;\r\n        const address = html_p_address.textContent;\r\n\r\n        const geocodeService = L.esri.Geocoding.geocodeService();\r\n        const map = L.map('map').setView([lat, lng], 17);\r\n\r\n        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n            attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n        }).addTo(map);\r\n\r\n        const marker = new L.marker([lat, lng], {\r\n            draggable: false,\r\n            autoPan: true\r\n        }).addTo(map);\r\n\r\n        marker.bindPopup(address);\r\n    });\r\n})();\n\n//# sourceURL=webpack://homesforsale/./app/public/src/maps-public.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/public/src/maps-public.js"]();
/******/ 	
/******/ })()
;