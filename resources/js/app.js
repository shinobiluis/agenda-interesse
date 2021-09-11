require('./bootstrap');
/******* Importaciones *******/

// Importamos Swal para usar las notificaciones
import Swal from 'sweetalert2';

// Se importan metodos que se utilizan
import { 
    limpiarErrores, 
    notificarErrores, 
    notificarErroresTelefono,
    notificarErroresEditarUsuario
} from './errores.js';
import { validarForm } from './validarForm.js';
import { notificacion } from './notificacion.js';

/****** variables ******/
// Se crean variables que seran usadas mas adelante. 
const btnAddContact = document.querySelector('#btnAddContact');
const bodyTable = document.querySelector('#bodyTable');
const telefonosContacto = document.querySelector('#telefonosContacto');
const btnAddNumber = document.querySelector('#btnAddNumber');
const btnEditUser = document.querySelector('#btnEditUser');

/****** Funciones ******/
// Este metodo se encarga de crear un nuevo contacto
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
        const respuesta = await crearContacto( form );
        if( respuesta.status == true ){
            // este metodo solo pasa datos al swal para notificar.
            notificacion( 'Bien...!', 'Registro correcto', 'success' );
            // Recargamos la tabla de contactos
            consultarContactos();
        }else{
            // este metodo solo pasa datos al swall para notificar.
            notificacion( 'Error...!', 'Uno o mas campos tienen error', 'error' );
            // este metodo activa los errores en el formulario y sele pasa el
            // arreglo de errores que retorna el servicio con codigo 422
            notificarErrores( respuesta.errores );
        }
    }
}
// Metodo para enviar informacion al servicio y generar el contacto
const crearContacto = async ( form ) => {
    try{
        // se realiza peticion con axios
        const response = await axios.post("/api/users", form);
        const data = await response.data;
        // limpiiamos el formulario y cerramos la modal
        document.getElementById("formAddContact").reset();
        // cerramos la modal dando click al boton de cierre de modal.
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

// este metodo consulta todos los contactos y en caso de no encontrar
// datos solo limpia la tabla, en caso de encontrar datos creara las filas
const consultarContactos = async () =>{
    const response = await axios.get("/api/users");
    const data = await response.data.data;
    if( data.length == 0 ){
        // limpiamos la tabla
        bodyTable.innerHTML = '';
    }else{
        // creamos la filas de la tabla
        crearFilas( data );
    }
}
// este metodo recibe un array con todos los valos que requiere para
// pintar la informacion.
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
    });
    // pintamos la tabla
    bodyTable.innerHTML = html;
    // creamos los eventos de los botones dentro de la tabla
    agregarEventosBotonesTabla();
}

// este metodo toma los botones genereados en la tabla y los activa a la espera del evento click
const agregarEventosBotonesTabla = () =>{
    // agregamos eventos a los botones
    const btnEliminar = document.getElementsByClassName("btnEliminar");
    const btnVerTelefonos = document.getElementsByClassName("btnVerTelefonos");
    const btnAgregarTelefono = document.getElementsByClassName("btnAgregarTelefono");
    const btnEditarUsuario = document.getElementsByClassName('btnEditarUsuario');
    // cada uno de estos for recorre los elementos para que espere un click
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

// este metodo elimina un registro de contacto
const eliminarRegistro = async (e) => {
    const response = await axios.delete(`/api/users/${e.target.dataset.id}`);
    const data = await response.data;
    // si se elimino de forma correcta notificamos
    if( data.status == true ){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro eliminado',
            showConfirmButton: false,
            timer: 1500
        })
        // recargamos la tabla de contactos
        consultarContactos();
    }
}
//Consultamos los telefonos registrados para un contacto.
const verTelefonos = async (e) => {
    // limpiamos el contenido de la modal para que siempre este sin datos
    // telefonosContacto hace referencia al body de la modal que mustra los telefonos
    // si no se limpia se veran los telefonos de una consulta pasada.
    telefonosContacto.innerHTML = '';
    const response = await axios.get(`/api/users/${e.target.dataset.id}`);
    const data = await response.data.data.telefonos;
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
    // pintamos los telefonos de la consulta
    telefonosContacto.innerHTML = html;
    // agregamos eventos sl boton de eliminar numero.
    agregarEventosBotonesNumero();
}

// esta funcion hace que al listado de numeros se pueda dar clik y mandar a llamar el 
// metodo eliminarNumero.
const agregarEventosBotonesNumero = () =>{
    // agregamos eventos a los botones
    var btnRemoveNumber = document.getElementsByClassName("btnRemoveNumber");
    for (var i = 0; i < btnRemoveNumber.length; i++) {
        btnRemoveNumber[i].addEventListener('click', eliminarNumero, false);
    }
}
// este metodo solo agrega el id del usuario en un input oculto.
const agregarTelefonos = (e) => {
    document.querySelector('#user_id').value = e.target.dataset.id;
}
// Este metodo consulta un contacto y se usa para llenar el formulario de editar contacto.
const consultarContacto = async (e) => {
    document.querySelector('#user_id_edit').value = e.target.dataset.id; 
    const response = await axios.get(`/api/users/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        // hacemos que los inputs de editar se llenen con la informacion.
        document.getElementById('name-edit').value= data.data.nombre;
        document.getElementById('email-edit').value= data.data.email;
    }
}
// este metodo hace la solicitud de eliminar el contacto.
// el parametro e es el elemento que recivio el click el cual tiene un data atributo
// llamado id que es el id del numero que debe solicitar eliminar.
const eliminarNumero = async (e) => {
    // console.log(e.target.dataset.id)
    const response = await axios.delete(`/api/phones/${e.target.dataset.id}`);
    const data = await response.data;
    if( data.status == true ){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro eliminado',
            showConfirmButton: false,
            timer: 1500
        });
        // eliminamos el elemento en la vista.
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

// este metodo se encarga de realizar la solicitud para editar el nombre y correo
// de un contacto.
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
        const response = await axios.post("/api/phones", form);
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
// este metodo se manda a llamar arriba  y es el metodo que realiza la peticion
// con axios para editar la informacion del contacto.
const enviarEditaUsuario = async ( form ) => {
    try{
        const user_id = document.querySelector('#user_id_edit').value.trim()
        const response = await axios.put(`/api/users/${user_id}`, form);
        const data = await response.data;
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
// Metodo para crear el formularo para editar un contacto.
const crearFormularioEditarUsuario = () => {
    const form = {
        'name':document.querySelector('#name-edit').value.trim(),
        'email':document.querySelector('#email-edit').value.trim()
    }
    return form;
}

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
