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

/***/ "./app/public/src/maps.js":
/*!********************************!*\
  !*** ./app/public/src/maps.js ***!
  \********************************/
/***/ (() => {

eval("(async () => {\r\n    document.addEventListener('DOMContentLoaded', async () => {\r\n        let html_span_address = document.querySelector('#address');\r\n        let html_input_fullAddress = document.querySelector('#full_address');\r\n        let html_input_latitude = document.querySelector('#latitude');\r\n        let html_input_longitude = document.querySelector('#longitude');\r\n\r\n        //Provider & Geocoder\r\n        const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n        const getUserLocation = () => {\r\n            return new Promise(async (resolve, reject) => {\r\n                navigator.geolocation.getCurrentPosition(\r\n                    ({coords: {longitude, latitude}}) => {\r\n                        const coords = {\r\n                            longitude,\r\n                            latitude\r\n                        }\r\n                        resolve(coords);\r\n                    },\r\n                    (err) => {\r\n                        console.error(err);\r\n                        alert('You must need have location enabled in this page to access the map view');\r\n                        reject(err);\r\n                    },\r\n                    {\r\n                        enableHighAccuracy: true,\r\n                        maximumAge: 0,\r\n                        timeout: 10000\r\n                    }\r\n                )\r\n            });\r\n        }\r\n\r\n        const setLocation = (lat, lng) => {\r\n            //Get address\r\n            geocodeService.reverse().latlng({lat, lng}, 13).run((err, result) => {\r\n                if (err) {\r\n                    return;\r\n                }\r\n\r\n                //console.log(result)\r\n                //Popup to see the pin location\r\n                marker.bindPopup(result.address.LongLabel);\r\n\r\n                if (html_span_address) {\r\n                    html_span_address.textContent = result.address.LongLabel;\r\n                }\r\n\r\n                html_input_fullAddress.value = result.address.LongLabel;\r\n                html_input_latitude.value = lat;\r\n                html_input_longitude.value = lng;\r\n            });\r\n        }\r\n\r\n        const userCoords = await getUserLocation();\r\n    \r\n        if (!html_input_fullAddress.value) {\r\n            setLocation(userCoords.latitude, userCoords.longitude);\r\n        }\r\n\r\n        let lat = html_input_latitude.value  || userCoords.latitude;\r\n        let lng = html_input_longitude.value || userCoords.longitude;\r\n\r\n        const map = L.map('map').setView([lat, lng ], 18);\r\n    \r\n        let marker;\r\n\r\n        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n            attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n        }).addTo(map);\r\n\r\n        //Pin config\r\n        marker = new L.marker([lat, lng], {\r\n            draggable: true,\r\n            autoPan: true\r\n        })\r\n        .addTo(map);\r\n\r\n        //After marker moving\r\n        marker.on('moveend', (ev) => {\r\n            marker = ev.target;\r\n\r\n            const {lat, lng} = marker.getLatLng();\r\n\r\n            map.panTo(new L.LatLng(lat, lng));\r\n \r\n            setLocation(lat, lng);\r\n        });\r\n    });\r\n})();\n\n//# sourceURL=webpack://homesforsale/./app/public/src/maps.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/public/src/maps.js"]();
/******/ 	
/******/ })()
;