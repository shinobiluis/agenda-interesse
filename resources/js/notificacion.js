import Swal from 'sweetalert2';
// metodo de swall
export const notificacion = ( title, text, icon ) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    })
}
