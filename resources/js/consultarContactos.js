import Swal from 'sweetalert2';
import { 
    limpiarErrores, 
    notificarErrores, 
    notificarErroresTelefono 
} from './errores.js'
import { validarForm } from './validarForm.js';
import { notificacion } from './notificacion.js';
const bodyTable = document.querySelector('#bodyTable');
const telefonosContacto = document.querySelector('#telefonosContacto');
const btnAddNumber = document.querySelector('#btnAddNumber');
// metodos
export const consultarContactos = async () =>{
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
    for (var i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener('click', eliminarRegistro, false);
    }
    for (var i = 0; i < btnVerTelefonos.length; i++) {
        btnVerTelefonos[i].addEventListener('click', verTelefonos, false);
    }
    for (var i = 0; i < btnAgregarTelefono.length; i++) {
        btnAgregarTelefono[i].addEventListener('click', agregarTelefonos, false);
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

// Metodo para crear la informacion del formulario para agregar numeros
const crearFormularioNumero = () => {
    const form = {
        'alias_number':document.querySelector('#alias_number-add').value.trim(),
        'number':document.querySelector('#number-add').value.trim(),
        'user_id':document.querySelector('#user_id').value.trim()
    }
    return form;
}

/****** AddEvents ******/
const addEventsListener = () =>{
    btnAddNumber.addEventListener("click", agregarNumero);
}
// Iniciamos los eventos
addEventsListener();
