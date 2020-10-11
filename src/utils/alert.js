import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

export const toast = (icon,message) => (
    Toast.fire({
        icon: icon,
        title: message
    })
)