let html_span_currentYear = document.querySelector('#current-year') || false;
let html_input_price = document.querySelector('#price') || false;
let html_input_nbathrooms = document.querySelector('#bathrooms') || false;
let html_input_nbedrooms = document.querySelector('#bedrooms') || false;
let html_input_nparkings = document.querySelector('#parkings') || false;

(() => {
    if (html_span_currentYear) html_span_currentYear.textContent = new Date().getFullYear();

    if (html_input_price) {
        const html_div_propertyValue = document.querySelector('#property-value');

        html_input_price.addEventListener('input', (ev) => {
            html_div_propertyValue.textContent = ev.target.value.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
    }

    if (html_input_nbathrooms) {
        const html_div_nbathroomsValue = document.querySelector('#number-of-bathrooms');

        html_input_nbathrooms.addEventListener('input', (ev) => {
            html_div_nbathroomsValue.textContent = ev.target.value.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
    }

    if (html_input_nbedrooms) {
        const html_div_nbedroomsValue = document.querySelector('#number-of-bedrooms');

        html_input_nbedrooms.addEventListener('input', (ev) => {
            html_div_nbedroomsValue.textContent = ev.target.value.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
    }

    if (html_input_nparkings) {
        const html_div_nparkingsValue = document.querySelector('#number-of-parking-spaces');

        html_input_nparkings.addEventListener('input', (ev) => {
            html_div_nparkingsValue.textContent = ev.target.value.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        });
    }
})();