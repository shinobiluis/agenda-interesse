require('./bootstrap');
// importamos Swall
import Swal from 'sweetalert2';
import {  consultarContactos } from './consultarContactos.js'
/****** variables ******/
const btnAddContact = document.querySelector('#btnAddContact');
const bodyTable = document.querySelector('#bodyTable');
const telefonosContacto = document.querySelector('#telefonosContacto');
const btnAddNumber = document.querySelector('#btnAddNumber');

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
            consultarContactos();
        }else{
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            notificarErrores( respuesta.errores );
        }
    }
}
// agregar numero a usuario
const agregarNumero = async () => {
    const form = crearFormularioNumero();

    limpiarErrores( form );
    // reutilizamos el metodo para validar formulario
    const validar = validarForm( form );
    console.log( form );
    // si la validacion es false notificamos el error
    if( validar == false ){
        notificacion( 'Error...!', 'Uno o mas campos estan vacios.....', 'error' );
    }else{
        // en caso de que no existan campos vacios realizamos la peticion
        const respuesta = await enviarNumero( form );
        console.log( 'respuesta', respuesta )
        if( respuesta.status == true ){
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
        }else{
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            notificarErroresTelefono( respuesta.errores );
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
// Metodo para enviar el formulario de numero
const enviarNumero = async ( form ) => {
    try{
        const response = await axios.post("http://agenda-interesse.kame.house/api/phones", form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        // document.getElementById("formAddContact").reset();
        // document.getElementById('btnCloseModal').click();
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
// metodo para notificar errores en el formulario al agregar un telefono
const notificarErroresTelefono = ( errores ) => {
    for (let clave in errores){
        const elemento = `#${clave}-add`; 
        const elementoError = `#${clave}-validate-add`;
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
// Metodo para crear la informacion del formulario para agregar numeros
const crearFormularioNumero = () => {
    const form = {
        'alias_number':document.querySelector('#alias_number-add').value.trim(),
        'number':document.querySelector('#number-add').value.trim(),
        'user_id':document.querySelector('#user_id').value.trim()
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
    btnAddNumber.addEventListener("click", agregarNumero);
}
// Iniciamos los eventos
addEventsListener();

// Consultamos los contactos de inicio
consultarContactos();
