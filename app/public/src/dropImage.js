import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const html_input_setImage = document.querySelector('#set-image');

//image = form id('image')
Dropzone.options.image = {
    dictDefaultMessage: 'Upload your image here',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove this image',
    dictMaxFilesExceeded: 'Only 1 image',
    
    headers: {
        //dropzone key name for csrf token
        'CSRF-Token': token
    },
    paramName: 'image',

    init: function() {
        const dropzone = this;

        html_input_setImage.addEventListener('click', () => {
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', () => {
            if (!dropzone.getActiveFiles().length) {
                setTimeout(() => {
                    window.location.href = '/me';
                }, 1500);
            }
        });
    }   
}