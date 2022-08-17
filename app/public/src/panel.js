const html_buttons_publish_array = document.querySelectorAll('#publish-property');
const html_buttons_delete_array = document.querySelectorAll('#delete-property');

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const location = window.location.host;

html_buttons_publish_array.forEach(html_btn_publishProperty => {
    html_btn_publishProperty.addEventListener('click', async (ev) => {
        const property_id = ev.target.dataset.property;
        
        const settings = {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': token
            }
        }
    
        try {
            const response = await fetch(`http://${location}/properties/change-status/${property_id}`, settings);
    
            ev.target.classList.toggle('bg-green-500');
            ev.target.classList.toggle('bg-gray-400');

            if (ev.target.classList.contains('bg-green-500')) ev.target.textContent = 'Published';
            if (ev.target.classList.contains('bg-gray-400')) ev.target.textContent = 'Not published';
        } catch (error) {
            console.log(error.data);
        }
    });
});

html_buttons_delete_array.forEach(html_btn_deleteProperty => {
    html_btn_deleteProperty.addEventListener('click', async (ev) => {
        const property_id = ev.target.dataset.property;

        const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': token
            }
        }

        try {
            const response = await fetch(`http://${location}/properties/delete/${property_id}`, settings);

            window.location.reload();
        } catch (error) {
            console.log(error.data);
        }
    });
});