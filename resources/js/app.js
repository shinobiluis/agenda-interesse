require('./bootstrap');
// importamos Swall
import Swal from 'sweetalert2';
/****** variables ******/
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
        console.log( 'respuesta', respuesta )
        if( respuesta.status == true ){
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
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

// metodo para notificar errores en el formulario
const notificarErrores = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}`; 
        const elementoError = `#${clave}-validate`;
        document.querySelector(elemento).classList.add('is-invalid');
        document.querySelector(elementoError).innerHTML =errores[clave][0];
    }
}

// metodo para limpiarErrores del fomulario 
const limpiarErrores = ( form ) => {
    for (let clave in form){
        const elemento = `#${clave}`; 
        document.querySelector(elemento).classList.remove('is-invalid');
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

// metodo de swall
const notificacion = ( title, text, icon ) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    })
}

// Validamos que los ningun campo este vacio antes de enviar
// El metodo retorna falso si encuentra un valor vacio 
// Si no hay valores vacios retorna true.
const validarForm = ( form ) => {
    for (let clave in form){
        if( form[clave] == "" ){
            return false;
        }
    }
    return true;
}

/****** AddEvents ******/
const addEventsListener = () =>{
    btnAddContact.addEventListener("click", agregarContacto);
}
// Iniciamos los eventos
addEventsListener();


