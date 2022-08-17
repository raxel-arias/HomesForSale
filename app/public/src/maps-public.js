(async () => {
    document.addEventListener('DOMContentLoaded', () => {
        const html_p_latitude = document.querySelector('#latitude');
        const html_p_longitude = document.querySelector('#longitude');
        const html_p_address = document.querySelector('#address');

        const lat = html_p_latitude.textContent;
        const lng = html_p_longitude.textContent;
        const address = html_p_address.textContent;

        const geocodeService = L.esri.Geocoding.geocodeService();
        const map = L.map('map').setView([lat, lng], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = new L.marker([lat, lng], {
            draggable: false,
            autoPan: true
        }).addTo(map);

        marker.bindPopup(address);
    });
})();