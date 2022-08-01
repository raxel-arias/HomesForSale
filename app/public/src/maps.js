(async () => {
    document.addEventListener('DOMContentLoaded', async () => {
        let html_span_address = document.querySelector('#address');
        let html_input_fullAddress = document.querySelector('#full_address');
        let html_input_latitude = document.querySelector('#latitude');
        let html_input_longitude = document.querySelector('#longitude');

        //Provider & Geocoder
        const geocodeService = L.esri.Geocoding.geocodeService();

        const getUserLocation = () => {
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
                        alert('You must need have location enabled in this page to access the map view');
                        reject(err);
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0,
                        timeout: 10000
                    }
                )
            });
        }

        const setLocation = (lat, lng) => {
            //Get address
            geocodeService.reverse().latlng({lat, lng}, 13).run((err, result) => {
                if (err) {
                    return;
                }

                //console.log(result)
                //Popup to see the pin location
                marker.bindPopup(result.address.LongLabel);

                html_span_address.textContent = result.address.LongLabel;

                html_input_fullAddress.value = result.address.LongLabel;
                html_input_latitude.value = lat;
                html_input_longitude.value = lng;
            });
        }

        const userCoords = await getUserLocation();
    
        html_span_address.textContent = html_input_fullAddress.value || 'Empty';

        if (!html_input_fullAddress.value) {
            setLocation(userCoords.latitude, userCoords.longitude);
        }

        let lat = html_input_latitude.value  || userCoords.latitude;
        let lng = html_input_longitude.value || userCoords.longitude;

        const map = L.map('map').setView([lat, lng ], 18);
    
        let marker;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //Pin config
        marker = new L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        })
        .addTo(map);

        //After marker moving
        marker.on('moveend', (ev) => {
            marker = ev.target;

            const {lat, lng} = marker.getLatLng();

            map.panTo(new L.LatLng(lat, lng));
 
            setLocation(lat, lng);
        });
    });
})();