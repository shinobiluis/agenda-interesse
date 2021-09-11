require('./bootstrap');
/******* Importaciones *******/
// Importamos Swal para usar las notificaciones
import Swal from 'sweetalert2';
// se importa el metodo encargado del funcionamiento de la consuta de contactos
// import { consultarContactos } from './consultarContactos.js';
import { 
    limpiarErrores, 
    notificarErrores, 
    notificarErroresTelefono,
    notificarErroresEditarUsuario
} from './errores.js';
import { validarForm } from './validarForm.js';
import { notificacion } from './notificacion.js';
/****** variables ******/
// Este boton abre la modal principal para agregar contactos
const btnAddContact = document.querySelector('#btnAddContact');
const bodyTable = document.querySelector('#bodyTable');
const telefonosContacto = document.querySelector('#telefonosContacto');
const btnAddNumber = document.querySelector('#btnAddNumber');
const btnEditUser = document.querySelector('#btnEditUser');

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


/**********/

// metodos
const consultarContactos = async () =>{
    const response = await axios.get("http://agenda-interesse.kame.house/api/users");
    const data = await response.data.data;
    if( data.length == 0 ){
        bodyTable.innerHTML = '';
    }else{
        crearFilas( data );
    }
}

const crearFilas = ( data ) => {
    let html = '';
    data.forEach( function(valor, indice, array) {
        html += `
            <tr>
                <td>${indice + 1}</td>
                <td>${data[indice].nombre}</td>
                <td>${data[indice].email}</td>
                <td>${data[indice].direccion.direccion}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btnEditarUsuario btn btn-info" data-id="${data[indice].id}" data-bs-toggle="modal" data-bs-target="#editarUsuario">
                            <i class="fas fa-user-edit"></i>
                        </button>
                        <button type="button" class="btnEliminar btn btn-danger" data-id="${data[indice].id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button type="button" class="btnVerTelefonos btn btn-warning" data-id="${data[indice].id}" data-bs-toggle="modal" data-bs-target="#verTelefonos">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button type="button" class="btnAgregarTelefono btn btn-success" data-id="${data[indice].id}" data-bs-toggle="modal" data-bs-target="#agregarTelefonos">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `
        bodyTable.innerHTML = html;
        agregarEventosBotonesTabla();
    });
}




const agregarEventosBotonesTabla = () =>{
    // agregamos eventos a los botones
    var btnEliminar = document.getElementsByClassName("btnEliminar");
    var btnVerTelefonos = document.getElementsByClassName("btnVerTelefonos");
    var btnAgregarTelefono = document.getElementsByClassName("btnAgregarTelefono");
    const btnEditarUsuario = document.getElementsByClassName('btnEditarUsuario');
    for (var i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener('click', eliminarRegistro, false);
    }
    for (var i = 0; i < btnVerTelefonos.length; i++) {
        btnVerTelefonos[i].addEventListener('click', verTelefonos, false);
    }
    for (var i = 0; i < btnAgregarTelefono.length; i++) {
        btnAgregarTelefono[i].addEventListener('click', agregarTelefonos, false);
    }
    for (var i = 0; i < btnEditarUsuario.length; i++) {
        btnEditarUsuario[i].addEventListener('click', consultarContacto, false);
    }
}
const eliminarRegistro = async (e) => {
    const response = await axios.delete(`http://agenda-interesse.kame.house/api/users/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro eliminado',
            showConfirmButton: false,
            timer: 1500
        })    
        consultarContactos();
    }
}
const verTelefonos = async (e) => {
    telefonosContacto.innerHTML = '';
    // http://agenda-interesse.kame.house/api/users/11
    const response = await axios.get(`http://agenda-interesse.kame.house/api/users/${e.target.dataset.id}`);
    const data = await response.data.data.telefonos;
    console.log(data)
    // pintamos los telefonos en la vista
    let html = '<ul class="list-group">';
    data.forEach( function(valor, indice, array) {
        html += `
        <li class="list-group-item">
            <div class="row">
                <div class="col-10">
                    ${data[indice].alias_numero}: ${data[indice].numero}
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-danger rounded-circle btnRemoveNumber" data-id="${data[indice].id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </li>
        `
    });
    html += '</ul>';
    telefonosContacto.innerHTML = html;
    agregarEventosBotonesNumero();
}

const agregarEventosBotonesNumero = () =>{
    // agregamos eventos a los botones
    var btnRemoveNumber = document.getElementsByClassName("btnRemoveNumber");
    for (var i = 0; i < btnRemoveNumber.length; i++) {
        btnRemoveNumber[i].addEventListener('click', eliminarNumero, false);
    }
}
const agregarTelefonos = (e) => {
    document.querySelector('#user_id').value = e.target.dataset.id;
}
const consultarContacto = async (e) => {
    document.querySelector('#user_id_edit').value = e.target.dataset.id; 
    // http://agenda-interesse.kame.house/api/users/11
    const response = await axios.get(`http://agenda-interesse.kame.house/api/users/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        document.getElementById('name-edit').value= data.data.nombre;
        document.getElementById('email-edit').value= data.data.email;
    }
}

const eliminarNumero = async (e) => {
    // console.log(e.target.dataset.id)
    const response = await axios.delete(`http://agenda-interesse.kame.house/api/phones/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro eliminado',
            showConfirmButton: false,
            timer: 1500
        })    
       e.target.parentNode.parentNode.parentNode.remove()
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

const  editarContacto= async () => {
    const form = crearFormularioEditarUsuario();
    limpiarErrores( form );
    // reutilizamos el metodo para validar formulario
    const validar = validarForm( form );
    console.log( form );
    // si la validacion es false notificamos el error
    if( validar == false ){
        notificacion( 'Error...!', 'Uno o mas campos estan vacios.....', 'error' );
    }else{
        // en caso de que no existan campos vacios realizamos la peticion
        const respuesta = await enviarEditaUsuario( form );
        console.log( 'respuesta', respuesta )
        if( respuesta.status == true ){
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
            consultarContactos();
            document.querySelector('#btnCloseEditUser').click();
        }else{
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            notificarErroresEditarUsuario( respuesta.errores );
        }
    }
}



// Metodo para enviar el formulario de numero
const enviarNumero = async ( form ) => {
    try{
        const response = await axios.post("http://agenda-interesse.kame.house/api/phones", form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        document.getElementById("agregarTelefono").reset();
        document.querySelector('#btnCloseModalNumber').click();
        return data;
    }catch (err) {
        // en caso de retornar un 422 de validacion del formulario
        // console.log(err.response.data)
        return err.response.data;
    }
}

const enviarEditaUsuario = async ( form ) => {
    console.log( form );
    try{
        const user_id = document.querySelector('#user_id_edit').value.trim()
        const response = await axios.put(`http://agenda-interesse.kame.house/api/users/${user_id}`, form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        // document.getElementById("formEditarUsuario").reset();
        // 
        return data;
    }catch (err) {
        // en caso de retornar un 422 de validacion del formulario
        // console.log(err.response.data)
        return err.response.data;
    }
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



const crearFormularioEditarUsuario = () => {
    const form = {
        'name':document.querySelector('#name-edit').value.trim(),
        'email':document.querySelector('#email-edit').value.trim()
    }
    return form;
}

/*********/



/****** AddEvents ******/
const addEventsListener = () =>{
    btnAddContact.addEventListener("click", agregarContacto);
    btnAddNumber.addEventListener("click", agregarNumero);
    btnEditUser.addEventListener("click", editarContacto);
}
// Iniciamos los eventos
addEventsListener();

// Consultamos los contactos de inicio
consultarContactos();
