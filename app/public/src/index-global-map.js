(async () => {

    //User coords
    const userCoords = await getUserLocation();
    const lat = userCoords.latitude;
    const lng = userCoords.longitude;

    //Map
    const map = await L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Current User Location Marker
    const userMarker = new L.marker([lat, lng], {
        draggable: false,
        autoPan: true,
        icon: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        })
    }).addTo(map).bindPopup(`<h3 class="text-red-400 block text-center">You</h3>`);

    //Marker group
    let markerGroup = L.layerGroup().addTo(map);

    //Important values
    let PROPERTIES_LIST = await getPropertiesList();
    reloadMarkers();

    //HTML
    const html_input_minPrice = document.querySelector('#minPrice');
    const html_input_maxPrice = document.querySelector('#maxPrice');
    const html_select_category_type = document.querySelector('#categories');
    const html_button_search = document.querySelector('#search');

    //initial query params after refresh the page;
    const params = new URLSearchParams(window.location.search);
    
    async function getPropertiesList(paramObj) {
        // let queryParamBuilder = '?';
        // if (!paramObj) {
        //     for (let key of params.keys()) {
        //         const entry = `${key}=${params.get(key)}`;
            
        //         queryParamBuilder = queryParamBuilder + entry + '&';
        //     }
        //     queryParamBuilder = queryParamBuilder.substring(0, queryParamBuilder.length-1);
        // }

        // const url = `http://${location.host}/properties/public/list${queryParamBuilder.length > 1 ? queryParamBuilder : ''}`;
        const url = `http://${location.host}/properties/public/list?${paramObj && paramObj.length > 1 ? paramObj : ''}`;

        const response = await fetch(url);
        const {data: {propertiesList}} = await response.json();

        return propertiesList;
    }

    function getUserLocation() {
        return new Promise(async (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                ({coords: {longitude, latitude}}) => {
                    const coords = {
                        longitude,
                        latitude
                    }

                    resolve(coords);
                },
                (err) => {
                    console.error(err);
                    alert('You must need have location in this page to access the map view');
                    reject(err);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000
                }
            );
        });
    }

    function reloadMarkers() {
        markerGroup.clearLayers();

        PROPERTIES_LIST.forEach(property => {
            const marker = new L.marker([property.location.latitude, property.location.longitude], {
                draggable: false,
                autoPan: true
            }).addTo(markerGroup).bindPopup(
                `
                    <div class="h-5 text-center">
                        <h3 class="text-lg font-bold">${property.title}</h3>
                        <img class="" src=${property.image ? `/img/server/${property.vendor}/uploads/${property.id_property}/${property.image}` : '/img/unknow-house.jpg'} alt="Image from ${property.title}">
                        <a href="/app/property/view/${property.id_property}" class="text-center p-2 block w-full bg-orange-400 hover:bg-orange-500 text-white">More Info</a>
                    </div>
                `
            );
        });
    }

    html_button_search.onclick = async () => {
        let queryParamBuilder = [];

        const params = {
            category: html_select_category_type.value,
            minPrice: html_input_minPrice.value,
            maxPrice: html_input_maxPrice.value,
        }

        // Object.keys(params).forEach((key) => {
        //     const keyName = key;

        //     const entry = `${keyName}=${params[keyName]}`;

        //     if (params[keyName] && params[keyName] !== 'null') {
        //         queryParamBuilder = queryParamBuilder + entry + '&';
        //     }
        // });
        // queryParamBuilder = queryParamBuilder.substring(0, queryParamBuilder.length-1); console.log(queryParamBuilder);

        Object.keys(params).forEach(key => {
            queryParamBuilder.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        });

        queryParamBuilder = queryParamBuilder.join('&');

        //Call API and fill map
        PROPERTIES_LIST = await getPropertiesList(queryParamBuilder);
        reloadMarkers();
    }

    /**RESPONSIVE SECTION**/

    //HTML (responsive);
    const html_div_menu = document.querySelector('.navbar-menu');
    const html_input_minPrice__responsive = document.querySelector('#minPrice__responsive');
    const html_input_maxPrice__responsive = document.querySelector('#maxPrice__responsive');
    const html_select_category_type__responsive = document.querySelector('#categories__responsive');
    const html_button_search__responsive = document.querySelector('#search__responsive');

    //Responsive search button
    html_button_search__responsive.onclick = async () => {
        let queryParamBuilder = [];

        const params = {
            category: html_select_category_type__responsive.value,
            minPrice: html_input_minPrice__responsive.value,
            maxPrice: html_input_maxPrice__responsive.value,
        }

        Object.keys(params).forEach(key => {
            queryParamBuilder.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        });

        queryParamBuilder = queryParamBuilder.join('&');

        //Call API and fill map
        PROPERTIES_LIST = await getPropertiesList(queryParamBuilder);
        reloadMarkers();

        html_div_menu.classList.toggle('hidden');
    }
})();