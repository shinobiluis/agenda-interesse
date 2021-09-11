require('./bootstrap');
/******* Importaciones *******/
// Importamos Swal para usar las notificaciones
import Swal from 'sweetalert2';
// se importa el metodo encargado del funcionamiento de la consuta de contactos
import { consultarContactos } from './consultarContactos.js';
import { 
    limpiarErrores, 
    notificarErrores, 
    notificarErroresTelefono 
} from './errores.js';
import { validarForm } from './validarForm.js';
import { notificacion } from './notificacion.js';
/****** variables ******/
// Este boton abre la modal principal para agregar contactos
const btnAddContact = document.querySelector('#btnAddContact');

/****** Funciones ******/
// agregar contacto
const agregarContacto = async () => {
    // creamos el formulario
    const form = crearFormulario();
    // limpiamos los errores del formulario
    limpiarErrores( form );
    // validamos que el formulario no tenga registros vacios
    const validar = validarForm( form );
    // si la validacion es false notificamos el error
    if( validar == false ){
        notificacion( 'Error...!', 'Uno o mas campos estan vacios', 'error' );
    }else{
        // en caso de que no existan campos vacios realizamos la peticion
        const respuesta = await enviar( form );
        if( respuesta.status == true ){
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
            consultarContactos();
        }else{
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            notificarErrores( respuesta.errores );
        }
    }
}
// Metodo para enviar informacion
const enviar = async ( form ) => {
    try{
        const response = await axios.post("http://agenda-interesse.kame.house/api/users", form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        document.getElementById("formAddContact").reset();
        document.getElementById('btnCloseModal').click();
        return data;
    }catch (err) {
        // en caso de retornar un 422 de validacion del formulario
        // console.log(err.response.data)
        return err.response.data;
    }
}
// Metodo para crear la informacion del formulario
const crearFormulario = () => {
    const form = {
        'name': document.querySelector('#name').value.trim(),
        'email':document.querySelector('#email').value.trim(),
        'alias_number':document.querySelector('#alias_number').value.trim(),
        'number':document.querySelector('#number').value.trim(),
        'alias_direction':document.querySelector('#alias_direction').value.trim(),
        'direction':document.querySelector('#direction').value.trim(),
        'postal_code':document.querySelector('#postal_code').value.trim()
    }
    return form;
}






/****** AddEvents ******/
const addEventsListener = () =>{
    btnAddContact.addEventListener("click", agregarContacto);
}
// Iniciamos los eventos
addEventsListener();

// Consultamos los contactos de inicio
consultarContactos();
